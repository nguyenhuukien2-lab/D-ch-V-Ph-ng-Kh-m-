-- =====================================================================
-- MEDCARE CLINIC — DATABASE SCHEMA (SQL SERVER)
-- =====================================================================
USE [MedCareClinic];
GO

-- =====================================================================
-- 1. USERS
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
CREATE TABLE [users] (
  [id]              UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [full_name]       NVARCHAR(150) NOT NULL,
  [phone]           VARCHAR(20) UNIQUE NOT NULL,
  [email]           VARCHAR(150) UNIQUE,
  [password_hash]   VARCHAR(255) NOT NULL,
  [role]            VARCHAR(50) NOT NULL DEFAULT 'patient'
    CHECK ([role] IN ('patient', 'receptionist', 'doctor', 'admin')),
  [gender]          VARCHAR(20) CHECK ([gender] IN ('male', 'female', 'other')),
  [date_of_birth]   DATE,
  [avatar_url]      NVARCHAR(MAX),
  [is_active]       BIT NOT NULL DEFAULT 1,
  [created_at]      DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  [updated_at]      DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX idx_users_role ON [users]([role]);
CREATE INDEX idx_users_phone ON [users]([phone]);
END
GO

-- =====================================================================
-- 2. SPECIALTIES
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'specialties')
BEGIN
CREATE TABLE [specialties] (
  [id]          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [name]        NVARCHAR(100) NOT NULL UNIQUE,
  [slug]        VARCHAR(120) NOT NULL UNIQUE,
  [description] NVARCHAR(MAX),
  [icon]        VARCHAR(50),
  [created_at]  DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
END
GO

-- =====================================================================
-- 3. DOCTORS
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'doctors')
BEGIN
CREATE TABLE [doctors] (
  [id]                UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [user_id]           UNIQUEIDENTIFIER NOT NULL UNIQUE REFERENCES [users]([id]) ON DELETE CASCADE,
  [specialty_id]      UNIQUEIDENTIFIER NOT NULL REFERENCES [specialties]([id]),
  [degree]            VARCHAR(100),
  [bio]               NVARCHAR(MAX),
  [experience_years]  SMALLINT NOT NULL DEFAULT 0,
  [license_number]    VARCHAR(50),
  [consultation_fee]  NUMERIC(12,0),
  [rating_avg]        NUMERIC(3,2) DEFAULT 0,
  [rating_count]      INT DEFAULT 0,
  [is_featured]       BIT NOT NULL DEFAULT 0,
  [created_at]        DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  [updated_at]        DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX idx_doctors_specialty ON [doctors]([specialty_id]);
END
GO

-- =====================================================================
-- 4. DOCTOR_SCHEDULES
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'doctor_schedules')
BEGIN
CREATE TABLE [doctor_schedules] (
  [id]           UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [doctor_id]    UNIQUEIDENTIFIER NOT NULL REFERENCES [doctors]([id]) ON DELETE CASCADE,
  [weekday]      VARCHAR(10) NOT NULL CHECK ([weekday] IN ('mon','tue','wed','thu','fri','sat','sun')),
  [start_time]   TIME NOT NULL,
  [end_time]     TIME NOT NULL,
  [slot_minutes] SMALLINT NOT NULL DEFAULT 30,
  [is_active]    BIT NOT NULL DEFAULT 1,
  CONSTRAINT uq_doctor_weekday_time UNIQUE ([doctor_id], [weekday], [start_time])
);
END
GO

-- =====================================================================
-- 5. DOCTOR_TIME_OFF
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'doctor_time_off')
BEGIN
CREATE TABLE [doctor_time_off] (
  [id]         UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [doctor_id]  UNIQUEIDENTIFIER NOT NULL REFERENCES [doctors]([id]) ON DELETE CASCADE,
  [off_date]   DATE NOT NULL,
  [start_time] TIME,
  [end_time]   TIME,
  [reason]     VARCHAR(255),
  [created_at] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX idx_time_off_doctor_date ON [doctor_time_off]([doctor_id], [off_date]);
END
GO

-- =====================================================================
-- 6. SERVICES
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'services')
BEGIN
CREATE TABLE [services] (
  [id]                UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [specialty_id]      UNIQUEIDENTIFIER REFERENCES [specialties]([id]),
  [name]              NVARCHAR(200) NOT NULL,
  [slug]              VARCHAR(220) NOT NULL UNIQUE,
  [short_desc]        VARCHAR(300),
  [description]       NVARCHAR(MAX),
  [price]             NUMERIC(12,0) NOT NULL,
  [duration_minutes]  SMALLINT NOT NULL DEFAULT 30,
  [image_url]         NVARCHAR(MAX),
  [is_package]        BIT NOT NULL DEFAULT 0,
  [is_active]         BIT NOT NULL DEFAULT 1,
  [created_at]        DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  [updated_at]        DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX idx_services_specialty ON [services]([specialty_id]);
CREATE INDEX idx_services_slug ON [services]([slug]);
END
GO

-- =====================================================================
-- 7. APPOINTMENTS
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'appointments')
BEGIN
CREATE TABLE [appointments] (
  [id]               UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [code]             VARCHAR(20) UNIQUE NOT NULL,
  [patient_id]       UNIQUEIDENTIFIER NOT NULL REFERENCES [users]([id]),
  [doctor_id]        UNIQUEIDENTIFIER REFERENCES [doctors]([id]),
  [service_id]       UNIQUEIDENTIFIER NOT NULL REFERENCES [services]([id]),
  [appointment_date] DATE NOT NULL,
  [time_slot]        TIME NOT NULL,
  [status]           VARCHAR(50) NOT NULL DEFAULT 'pending'
    CHECK ([status] IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  [reason]           NVARCHAR(MAX),
  [note]             NVARCHAR(MAX),
  [cancelled_reason] NVARCHAR(MAX),
  [created_at]       DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  [updated_at]       DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  CONSTRAINT uq_doctor_slot UNIQUE ([doctor_id], [appointment_date], [time_slot])
);

CREATE INDEX idx_appointments_patient ON [appointments]([patient_id]);
CREATE INDEX idx_appointments_doctor_date ON [appointments]([doctor_id], [appointment_date]);
CREATE INDEX idx_appointments_status ON [appointments]([status]);
END
GO

-- =====================================================================
-- 8. REVIEWS
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reviews')
BEGIN
CREATE TABLE [reviews] (
  [id]             UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [appointment_id] UNIQUEIDENTIFIER NOT NULL REFERENCES [appointments]([id]) ON DELETE CASCADE,
  [patient_id]     UNIQUEIDENTIFIER NOT NULL REFERENCES [users]([id]),
  [doctor_id]      UNIQUEIDENTIFIER REFERENCES [doctors]([id]),
  [rating]         SMALLINT NOT NULL CHECK ([rating] >= 1 AND [rating] <= 5),
  [comment]        NVARCHAR(MAX),
  [is_approved]    BIT NOT NULL DEFAULT 0,
  [created_at]     DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  CONSTRAINT uq_appointment_review UNIQUE ([appointment_id])
);

CREATE INDEX idx_reviews_doctor ON [reviews]([doctor_id]);
CREATE INDEX idx_reviews_approved ON [reviews]([is_approved]);
END
GO

-- =====================================================================
-- 9. ARTICLES
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'articles')
BEGIN
CREATE TABLE [articles] (
  [id]           UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [author_id]    UNIQUEIDENTIFIER REFERENCES [users]([id]),
  [title]        NVARCHAR(255) NOT NULL,
  [slug]         VARCHAR(280) NOT NULL UNIQUE,
  [excerpt]      VARCHAR(400),
  [content]      NVARCHAR(MAX) NOT NULL,
  [category]     VARCHAR(100),
  [thumbnail]    NVARCHAR(MAX),
  [is_published] BIT NOT NULL DEFAULT 0,
  [published_at] DATETIME2,
  [created_at]   DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
  [updated_at]   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX idx_articles_slug ON [articles]([slug]);
CREATE INDEX idx_articles_published ON [articles]([is_published], [published_at]);
END
GO

-- =====================================================================
-- 10. REFRESH_TOKENS
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'refresh_tokens')
BEGIN
CREATE TABLE [refresh_tokens] (
  [id]         UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [user_id]    UNIQUEIDENTIFIER NOT NULL REFERENCES [users]([id]) ON DELETE CASCADE,
  [token_hash] VARCHAR(255) NOT NULL,
  [expires_at] DATETIME2 NOT NULL,
  [revoked]    BIT NOT NULL DEFAULT 0,
  [created_at] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX idx_refresh_tokens_user ON [refresh_tokens]([user_id]);
END
GO

-- =====================================================================
-- 11. CLINIC_SETTINGS
-- =====================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'clinic_settings')
BEGIN
CREATE TABLE [clinic_settings] (
  [key]        VARCHAR(100) PRIMARY KEY,
  [value]      NVARCHAR(MAX) NOT NULL,
  [updated_at] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
END
GO

-- =====================================================================
-- SEED DATA
-- =====================================================================
IF NOT EXISTS (SELECT * FROM [specialties])
BEGIN
INSERT INTO [specialties] ([id], [name], [slug], [icon]) VALUES
  (NEWID(), N'Nội tổng quát', 'noi-tong-quat', 'stethoscope'),
  (NEWID(), N'Nhi khoa', 'nhi-khoa', 'baby'),
  (NEWID(), N'Sản phụ khoa', 'san-phu-khoa', 'heart'),
  (NEWID(), N'Nha khoa', 'nha-khoa', 'tooth'),
  (NEWID(), N'Da liễu', 'da-lieu', 'sparkles'),
  (NEWID(), N'Xét nghiệm', 'xet-nghiem', 'flask');
END
GO

IF NOT EXISTS (SELECT * FROM [clinic_settings])
BEGIN
INSERT INTO [clinic_settings] ([key], [value]) VALUES
  ('hotline', '1900 6868'),
  ('working_hours', '07:30 - 20:00'),
  ('address', 'Cập nhật địa chỉ phòng khám của bạn'),
  ('email', 'lienhe@medcare.vn'),
  ('license_number', 'Số giấy phép từ Sở Y Tế'),
  ('slogan', 'Bác Sĩ Thật · Thông Tin Thật · Giá Trị Thật');
END
GO
