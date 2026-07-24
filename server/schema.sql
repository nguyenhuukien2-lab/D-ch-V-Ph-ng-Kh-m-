-- Schema SQL cho Database PostgreSQL MedCare Clinic
-- Bạn có thể chép file này chạy trực tiếp trên PostgreSQL / Supabase / NeonDB

-- 1. Bảng Người Dùng (Users & Roles)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'PATIENT', -- PATIENT | ADMIN | RECEPTIONIST | DOCTOR
    dob DATE,
    gender VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Bác Sĩ (Doctors)
CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    degree VARCHAR(100),
    specialty VARCHAR(100) NOT NULL,
    specialty_slug VARCHAR(100),
    experience VARCHAR(50),
    experience_years INT DEFAULT 10,
    hospital VARCHAR(150),
    avatar TEXT,
    bio TEXT,
    schedule_days TEXT[], -- Array ngày trực
    rating DECIMAL(3,2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    certificates TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Dịch Vụ Khám (Services)
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    old_price DECIMAL(12,2),
    duration VARCHAR(50) DEFAULT '30 phút',
    description TEXT,
    image TEXT,
    popular BOOLEAN DEFAULT FALSE,
    procedure_steps TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng Lịch Hẹn Khám (Appointments)
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    service_id VARCHAR(50) REFERENCES services(id) ON DELETE SET NULL,
    service_name VARCHAR(150),
    price DECIMAL(12,2),
    doctor_id VARCHAR(50) REFERENCES doctors(id) ON DELETE SET NULL,
    doctor_name VARCHAR(100),
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'Chờ xác nhận', -- Chờ xác nhận | Đã xác nhận | Đã khám | Đã hủy
    reason TEXT,
    notes TEXT,
    cancel_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index chống trùng lịch hẹn (Anti double-booking index)
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_doctor_slot 
ON appointments(doctor_id, appointment_date, time_slot) 
WHERE status != 'Đã hủy';

-- 5. Bảng Bài Viết Y Học (Articles)
CREATE TABLE IF NOT EXISTS articles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    category VARCHAR(100),
    author VARCHAR(100),
    image TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
