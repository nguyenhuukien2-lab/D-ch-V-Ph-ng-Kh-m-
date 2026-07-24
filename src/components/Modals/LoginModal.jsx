import React, { useState } from 'react';
import { X, User, Lock, Phone, KeyRound, ShieldAlert, CheckCircle, ArrowRight, Heart } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'admin'
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('0908123456');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('');
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPass, setAdminPass] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeTab === 'patient') {
      if (!phone || phone.length < 9) {
        setErrorMsg('Vui lòng nhập số điện thoại hợp lệ');
        return;
      }
      if (isRegister && !name) {
        setErrorMsg('Vui lòng nhập họ và tên của bạn');
        return;
      }
      onLoginSuccess({
        id: 'pat-' + Date.now(),
        name: isRegister ? name : (name || 'Nguyễn Văn Minh'),
        phone: phone,
        role: 'patient',
        email: 'benhnhan@gmail.com'
      });
      onClose();
    } else {
      // Admin authentication check
      if (adminUser === 'admin' && adminPass === 'admin123') {
        onLoginSuccess({
          id: 'admin-1',
          name: 'Quản Trị Viên MedCare',
          role: 'admin',
          email: 'admin@medcare.vn'
        });
        onClose();
      } else {
        setErrorMsg('Tài khoản hoặc mật khẩu Admin không chính xác! (Thử: admin / admin123)');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mx-auto text-teal-300">
            <Heart className="w-6 h-6 fill-teal-400" />
          </div>
          <h3 className="text-xl font-bold">Cổng Đăng Nhập MedCare</h3>
          <p className="text-xs text-teal-200">Quản lý lịch hẹn & hồ sơ khám bệnh tiện lợi</p>

          {/* Role Toggle Tabs */}
          <div className="grid grid-cols-2 p-1 bg-black/20 backdrop-blur rounded-xl text-xs font-semibold mt-4">
            <button
              onClick={() => { setActiveTab('patient'); setErrorMsg(''); }}
              className={`py-2 rounded-lg transition ${activeTab === 'patient' ? 'bg-white text-teal-900 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Bệnh Nhân
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
              className={`py-2 rounded-lg transition ${activeTab === 'admin' ? 'bg-amber-400 text-slate-950 shadow font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Quản Trị (Admin)
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'patient' ? (
            <>
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên bệnh nhân *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn Minh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại đăng nhập *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="tel"
                    required
                    placeholder="0908xxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>{isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập Bệnh Nhân'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
                  className="text-xs text-teal-700 font-semibold hover:underline"
                >
                  {isRegister ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký tại đây'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <strong>Demo Admin Account:</strong>
                <p className="mt-0.5">Tên đăng nhập: <code className="bg-amber-100 px-1 rounded">admin</code> | Mật khẩu: <code className="bg-amber-100 px-1 rounded">admin123</code></p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tài khoản Admin *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text"
                    required
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu Admin *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="password"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Vào Trang Quản Trị Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
