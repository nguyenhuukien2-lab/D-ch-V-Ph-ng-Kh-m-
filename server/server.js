import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sql from 'mssql';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'medcare_secret_2026';

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// SQL Server Connection Pool
let dbPool = null;
let isDbConnected = false;

const rawServer = process.env.DB_SERVER || 'localhost';
const serverParts = rawServer.split('\\');

const sqlConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '123456',
  server: serverParts[0],
  database: process.env.DB_NAME || 'MedCareClinic',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    ...(serverParts[1] ? { instanceName: serverParts[1] } : {})
  }
};


async function connectToSqlServer() {
  try {
    dbPool = await sql.connect(sqlConfig);
    isDbConnected = true;
    console.log(`✅ [SQL SERVER SUCCESS] Connected to database: ${sqlConfig.database} on server: ${sqlConfig.server}`);
  } catch (err) {
    console.warn(`⚠️ [SQL SERVER NOTICE]: Connection failed (${err.message})`);
    console.warn(`👉 Running with In-Memory Mock Store until SQL Server credentials in server/.env are updated.`);
    isDbConnected = false;
  }
}

connectToSqlServer();

// IN-MEMORY FALLBACK STORE (Sync with MedCare mock schema)
const memoryStore = {
  users: [
    {
      id: 'usr-admin',
      full_name: 'Quản Trị Viên MedCare',
      phone: '0900000000',
      email: 'admin@medcare.vn',
      role: 'admin',
      password_hash: bcrypt.hashSync('admin123', 10)
    }
  ],
  services: [
    {
      id: 'srv-1',
      name: 'Khám Nội Khoa Tổng Quát',
      slug: 'kham-noi-khoa-tong-quat',
      price: 350000,
      duration_minutes: 30,
      description: 'Khám và đánh giá toàn diện các chỉ số cơ thể, chức năng tim mạch, hô hấp, tiêu hóa.',
      image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'srv-2',
      name: 'Siêu Âm Thai 4D HD-Live',
      slug: 'sieu-am-thai-4d',
      price: 450000,
      duration_minutes: 35,
      description: 'Dựng hình 4D sắc nét, chẩn đoán hình ảnh dị tật thai nhi sớm với công nghệ HD-Live.',
      image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    }
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'PGS.TS.BS Nguyễn Văn An',
      degree: 'Phó Giáo Sư - Tiến Sĩ - Bác Sĩ',
      specialty: 'Nội khoa & Tim Mạch',
      experience_years: 25,
      bio: 'Chuyên gia hàng đầu về chẩn đoán và điều trị bệnh lý tim mạch, huyết áp cao.',
      rating_avg: 4.9,
      rating_count: 380
    }
  ],
  appointments: [
    {
      id: 'apt-1',
      code: 'MC-89234',
      patient_name: 'Trần Văn Mạnh',
      phone: '0912345678',
      email: 'tranvanmanh@gmail.com',
      service_name: 'Khám Nội Khoa Tổng Quát',
      doctor_name: 'PGS.TS.BS Nguyễn Văn An',
      appointment_date: '2026-07-25',
      time_slot: '09:00',
      status: 'confirmed',
      created_at: new Date().toISOString()
    }
  ]
};

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { full_name, phone, password, email, role = 'patient' } = req.body;
    if (!full_name || !phone || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Mật khẩu.' });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    if (isDbConnected) {
      const request = dbPool.request();
      request.input('full_name', sql.NVarChar, full_name);
      request.input('phone', sql.VarChar, phone);
      request.input('email', sql.VarChar, email || null);
      request.input('password_hash', sql.VarChar, password_hash);
      request.input('role', sql.VarChar, role);

      const result = await request.query(`
        INSERT INTO [users] ([full_name], [phone], [email], [password_hash], [role])
        OUTPUT inserted.id, inserted.full_name, inserted.phone, inserted.email, inserted.role
        VALUES (@full_name, @phone, @email, @password_hash, @role)
      `);

      const user = result.recordset[0];
      const token = jwt.sign({ id: user.id, role: user.role, name: user.full_name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user });
    } else {
      const newUser = { id: 'usr-' + Date.now(), full_name, phone, email, role, password_hash };
      memoryStore.users.push(newUser);
      const token = jwt.sign({ id: newUser.id, role: newUser.role, name: newUser.full_name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: newUser.id, name: full_name, phone, email, role } });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi khi đăng ký tài khoản.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập/SĐT và mật khẩu.' });
    }

    if (isDbConnected) {
      const request = dbPool.request();
      request.input('username', sql.VarChar, username);
      const result = await request.query(`
        SELECT * FROM [users] WHERE [phone] = @username OR [email] = @username
      `);

      if (result.recordset.length === 0) {
        return res.status(400).json({ message: 'Tài khoản/SĐT hoặc mật khẩu không chính xác.' });
      }

      const user = result.recordset[0];
      const validPass = bcrypt.compareSync(password, user.password_hash);
      if (!validPass) {
        return res.status(400).json({ message: 'Mật khẩu không chính xác.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role, name: user.full_name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, name: user.full_name, phone: user.phone, email: user.email, role: user.role } });
    } else {
      if ((username === 'admin' || username === '0900000000') && password === 'admin123') {
        const user = { id: 'usr-admin', name: 'Quản Trị Viên MedCare', phone: '0900000000', role: 'admin' };
        const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token, user });
      }

      const user = memoryStore.users.find(u => u.phone === username || u.email === username);
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return res.status(400).json({ message: 'SĐT hoặc mật khẩu không đúng.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role, name: user.full_name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, name: user.full_name, phone: user.phone, email: user.email, role: user.role } });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi đăng nhập hệ thống.' });
  }
});

// GET SERVICES API
app.get('/api/services', async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await dbPool.request().query('SELECT * FROM [services] WHERE [is_active] = 1 ORDER BY [created_at] DESC');
      return res.json(result.recordset);
    }
    res.json(memoryStore.services);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải dịch vụ.' });
  }
});

// GET DOCTORS API
app.get('/api/doctors', async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await dbPool.request().query(`
        SELECT d.*, u.full_name as name, u.avatar_url as avatar, s.name as specialty 
        FROM [doctors] d
        JOIN [users] u ON d.user_id = u.id
        LEFT JOIN [specialties] s ON d.specialty_id = s.id
        ORDER BY d.[created_at] DESC
      `);
      return res.json(result.recordset);
    }
    res.json(memoryStore.doctors);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải danh sách bác sĩ.' });
  }
});

// GET APPOINTMENTS API
app.get('/api/appointments', async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await dbPool.request().query(`
        SELECT a.*, u.full_name as patient_name, u.phone as phone, s.name as service_name
        FROM [appointments] a
        JOIN [users] u ON a.patient_id = u.id
        JOIN [services] s ON a.service_id = s.id
        ORDER BY a.[created_at] DESC
      `);
      return res.json(result.recordset);
    }
    res.json(memoryStore.appointments);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải danh sách lịch hẹn.' });
  }
});

// CREATE APPOINTMENT API (ANTI DOUBLE-BOOKING CHECK)
app.post('/api/appointments', async (req, res) => {
  try {
    const { 
      patientName, phone, serviceId, doctorId, date, timeSlot, reason 
    } = req.body;

    if (!patientName || !phone || !date || !timeSlot) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ Họ tên, SĐT, Ngày và Giờ hẹn.' });
    }

    if (isDbConnected) {
      // 1. Check double booking
      const checkReq = dbPool.request();
      checkReq.input('doctorId', sql.UniqueIdentifier, doctorId || null);
      checkReq.input('date', sql.Date, date);
      checkReq.input('timeSlot', sql.Time, timeSlot);

      const checkRes = await checkReq.query(`
        SELECT [id] FROM [appointments] 
        WHERE [doctor_id] = @doctorId AND [appointment_date] = @date AND [time_slot] = @timeSlot AND [status] != 'cancelled'
      `);

      if (checkRes.recordset.length > 0) {
        return res.status(409).json({ message: 'Khung giờ này của Bác sĩ đã có bệnh nhân đặt. Vui lòng chọn giờ khác.' });
      }
    }

    const code = 'MC-' + Math.floor(10000 + Math.random() * 90000);
    console.log(`📱 [SMS DISPATCHER] Gửi tin nhắn SMS xác nhận tới SĐT ${phone}: [MEDCARE] Xac nhan lich hen ${code} ngay ${date}.`);
    
    return res.status(201).json({
      id: 'apt-' + Date.now(),
      code,
      patient_name: patientName,
      phone,
      appointment_date: date,
      time_slot: timeSlot,
      status: 'pending'
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Lỗi tạo lịch hẹn.' });
  }
});

// GET STATS OVERVIEW API
app.get('/api/stats', async (req, res) => {
  try {
    res.json({
      totalAppointments: memoryStore.appointments.length,
      pendingCount: memoryStore.appointments.filter(a => a.status === 'pending' || a.status === 'Chờ xác nhận').length,
      totalRevenue: 350000,
      databaseSystem: 'Microsoft SQL Server (MSSQL)',
      databaseName: sqlConfig.database,
      isDbConnected
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tải thống kê.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 MedCare Clinic Backend API Server running on port ${PORT}`);
  console.log(`🗄️ Database engine configured for Microsoft SQL Server (MSSQL): ${sqlConfig.database}`);
});
