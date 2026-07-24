import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'medcare_secret_2026';

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Connection
let pool = null;
let isDbConnected = false;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  pool.connect()
    .then((client) => {
      console.log('✅ Connected successfully to PostgreSQL database!');
      isDbConnected = true;
      client.release();
    })
    .catch((err) => {
      console.warn('⚠️ Warning: PostgreSQL connection failed or database not ready yet:', err.message);
      console.warn('👉 Fallback: Running with In-Memory Mock Store until DATABASE_URL is updated in server/.env');
      isDbConnected = false;
    });
}

// IN-MEMORY FALLBACK DATA STORE (Synchronized with mockData.js)
const memoryStore = {
  users: [
    {
      id: 'usr-admin',
      name: 'Quản Trị Viên MedCare',
      phone: '0900000000',
      email: 'admin@medcare.vn',
      role: 'admin',
      passwordHash: bcrypt.hashSync('admin123', 10)
    }
  ],
  services: [
    {
      id: 'srv-1',
      name: 'Khám Nội Khoa Tổng Quát',
      category: 'Nội khoa',
      price: 350000,
      oldPrice: 500000,
      duration: '30 phút',
      description: 'Khám và đánh giá toàn diện các chỉ số cơ thể, chức năng tim mạch, hô hấp, tiêu hóa.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      popular: true
    },
    {
      id: 'srv-2',
      name: 'Siêu Âm Thai 4D HD-Live',
      category: 'Sản phụ khoa',
      price: 450000,
      oldPrice: 600000,
      duration: '35 phút',
      description: 'Dựng hình 4D sắc nét, chẩn đoán hình ảnh dị tật thai nhi sớm với công nghệ HD-Live.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      popular: true
    }
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'PGS.TS.BS Nguyễn Văn An',
      degree: 'Phó Giáo Sư - Tiến Sĩ - Bác Sĩ',
      specialty: 'Nội khoa & Tim Mạch',
      experience: '25+ năm kinh nghiệm',
      hospital: 'Bệnh viện Chợ Rẫy',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      bio: 'Chuyên gia hàng đầu về chẩn đoán và điều trị bệnh lý tim mạch, huyết áp cao.',
      scheduleDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
      rating: 4.9,
      reviewCount: 380
    }
  ],
  appointments: [
    {
      id: 'apt-1',
      code: 'MC-89234',
      patientName: 'Trần Văn Mạnh',
      phone: '0912345678',
      email: 'tranvanmanh@gmail.com',
      dob: '1990-05-12',
      gender: 'Nam',
      serviceId: 'srv-1',
      serviceName: 'Khám Nội Khoa Tổng Quát',
      price: 350000,
      doctorId: 'doc-1',
      doctorName: 'PGS.TS.BS Nguyễn Văn An',
      date: '2026-07-25',
      timeSlot: '09:00 - 10:00',
      status: 'Đã xác nhận',
      reason: 'Đau ngực nhẹ khi vận động',
      createdAt: new Date().toISOString()
    }
  ]
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Truy cập bị từ chối. Vui lòng đăng nhập.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    req.user = user;
    next();
  });
};

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, password, email, role = 'patient' } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Mật khẩu.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userId = 'usr-' + Date.now();

    if (isDbConnected) {
      const result = await pool.query(
        'INSERT INTO users (id, name, phone, email, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, phone, email, role',
        [userId, name, phone, email || null, passwordHash, role]
      );
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user });
    } else {
      const newUser = { id: userId, name, phone, email, role, passwordHash };
      memoryStore.users.push(newUser);
      const token = jwt.sign({ id: newUser.id, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: newUser.id, name, phone, email, role } });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi đăng ký tài khoản.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập/SĐT và mật khẩu.' });
    }

    if (isDbConnected) {
      const result = await pool.query(
        'SELECT * FROM users WHERE phone = $1 OR email = $1 OR name = $1',
        [username]
      );
      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Số điện thoại/Tài khoản hoặc mật khẩu không chính xác.' });
      }
      const user = result.rows[0];
      const validPass = bcrypt.compareSync(password, user.password_hash);
      if (!validPass) {
        return res.status(400).json({ message: 'Mật khẩu không đúng.' });
      }
      const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role } });
    } else {
      // Admin demo fallback
      if ((username === 'admin' || username === '0900000000') && password === 'admin123') {
        const user = { id: 'usr-admin', name: 'Quản Trị Viên MedCare', phone: '0900000000', email: 'admin@medcare.vn', role: 'admin' };
        const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token, user });
      }

      const user = memoryStore.users.find(u => u.phone === username || u.email === username);
      if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(400).json({ message: 'Số điện thoại hoặc mật khẩu không đúng.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role } });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi đăng nhập hệ thống.' });
  }
});

// GET SERVICES API
app.get('/api/services', async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
      res.json(result.rows);
    } else {
      res.json(memoryStore.services);
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải danh sách dịch vụ.' });
  }
});

// GET DOCTORS API
app.get('/api/doctors', async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query('SELECT * FROM doctors ORDER BY created_at DESC');
      res.json(result.rows);
    } else {
      res.json(memoryStore.doctors);
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải danh sách bác sĩ.' });
  }
});

// APPOINTMENTS API WITH ANTI DOUBLE-BOOKING CHECK
app.get('/api/appointments', async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query('SELECT * FROM appointments ORDER BY created_at DESC');
      res.json(result.rows);
    } else {
      res.json(memoryStore.appointments);
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải danh sách lịch hẹn.' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { 
      patientName, phone, email, dob, gender, serviceId, serviceName, 
      price, doctorId, doctorName, date, timeSlot, reason, notes 
    } = req.body;

    if (!patientName || !phone || !date || !timeSlot) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ Họ tên, SĐT, Ngày và Giờ hẹn.' });
    }

    const code = 'MC-' + Math.floor(10000 + Math.random() * 90000);
    const appointmentId = 'apt-' + Date.now();

    if (isDbConnected) {
      // 1. Check double booking
      const checkConflict = await pool.query(
        'SELECT id FROM appointments WHERE doctor_id = $1 AND appointment_date = $2 AND time_slot = $3 AND status != $4',
        [doctorId, date, timeSlot, 'Đã hủy']
      );

      if (checkConflict.rows.length > 0) {
        return res.status(409).json({ message: 'Khung giờ này của Bác sĩ đã được bệnh nhân khác đăng ký. Vui lòng chọn khung giờ khác.' });
      }

      // 2. Insert new appointment
      const result = await pool.query(
        `INSERT INTO appointments 
        (id, code, patient_name, phone, email, dob, gender, service_id, service_name, price, doctor_id, doctor_name, appointment_date, time_slot, status, reason, notes) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
        RETURNING *`,
        [appointmentId, code, patientName, phone, email || null, dob || null, gender || 'Nam', serviceId, serviceName, price, doctorId, doctorName, date, timeSlot, 'Chờ xác nhận', reason, notes]
      );

      console.log(`📱 [SMS DISPATCHER] Gửi tin nhắn SMS xác nhận tới SĐT ${phone}: [MEDCARE] Xac nhan lich hen ${code} ngay ${date} lúc ${timeSlot}.`);
      return res.status(201).json(result.rows[0]);

    } else {
      // In-Memory Anti Double Booking Check
      const existing = memoryStore.appointments.find(
        a => a.doctorId === doctorId && a.date === date && a.timeSlot === timeSlot && a.status !== 'Đã hủy'
      );

      if (existing) {
        return res.status(409).json({ message: 'Khung giờ này của Bác sĩ đã có người đăng ký. Vui lòng chọn giờ khác.' });
      }

      const newApt = {
        id: appointmentId,
        code,
        patientName,
        phone,
        email: email || '',
        dob,
        gender,
        serviceId,
        serviceName,
        price,
        doctorId,
        doctorName,
        date,
        timeSlot,
        status: 'Chờ xác nhận',
        reason,
        notes,
        createdAt: new Date().toISOString()
      };

      memoryStore.appointments.unshift(newApt);
      console.log(`📱 [SMS DISPATCHER] Gửi tin nhắn SMS tới ${phone}: Mã lịch hẹn ${code} cho ngày ${date}.`);
      return res.status(201).json(newApt);
    }
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Lỗi hệ thống khi tạo lịch hẹn.' });
  }
});

// UPDATE APPOINTMENT STATUS (ADMIN)
app.patch('/api/appointments/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isDbConnected) {
      await pool.query('UPDATE appointments SET status = $1 WHERE id = $2', [status, id]);
    } else {
      const apt = memoryStore.appointments.find(a => a.id === id);
      if (apt) apt.status = status;
    }

    res.json({ message: 'Cập nhật trạng thái thành công', status });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái.' });
  }
});

// ADMIN STATS OVERVIEW
app.get('/api/stats', async (req, res) => {
  try {
    let totalAppointments = 0;
    let pendingCount = 0;
    let totalRevenue = 0;

    if (isDbConnected) {
      const totalRes = await pool.query('SELECT COUNT(*) FROM appointments');
      const pendingRes = await pool.query("SELECT COUNT(*) FROM appointments WHERE status = 'Chờ xác nhận'");
      const revRes = await pool.query('SELECT SUM(price) FROM appointments');
      
      totalAppointments = parseInt(totalRes.rows[0].count, 10);
      pendingCount = parseInt(pendingRes.rows[0].count, 10);
      totalRevenue = parseFloat(revRes.rows[0].sum || 0);
    } else {
      totalAppointments = memoryStore.appointments.length;
      pendingCount = memoryStore.appointments.filter(a => a.status === 'Chờ xác nhận').length;
      totalRevenue = memoryStore.appointments.reduce((sum, a) => sum + (a.price || 350000), 0);
    }

    res.json({
      totalAppointments,
      pendingCount,
      totalRevenue,
      isDbConnected,
      dbStatus: isDbConnected ? 'PostgreSQL Live Connected' : 'In-Memory Fallback Store'
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải thống kê.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 MedCare Clinic Backend API Server running live on port ${PORT}`);
  console.log(`📡 PostgreSQL Connection URL Configured: ${process.env.DATABASE_URL ? 'YES' : 'NO (Using In-Memory)'}`);
});
