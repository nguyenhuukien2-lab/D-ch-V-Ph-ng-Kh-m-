import React, { useState } from 'react';
import { 
  Phone, Clock, MapPin, Calendar, User, ShieldCheck, Menu, X, 
  ChevronRight, Heart, Sparkles, LogOut, CheckCircle2, Search, Plus
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function Header({ 
  currentPath, 
  onNavigate, 
  user, 
  onOpenLogin, 
  onLogout 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Trang Chủ', path: '/' },
    { label: 'Giới Thiệu', path: '/gioi-thieu' },
    { label: 'Dịch Vụ', path: '/dich-vu' },
    { label: 'Đội Ngũ Bác Sĩ', path: '/bac-si' },
    { label: 'Bảng Giá', path: '/bang-gia' },
    { label: 'Thông Tin & Tin Tức', path: '/tin-tuc' },
    { label: 'Liên Hệ', path: '/lien-he' },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      
      {/* 1. Top Mini Bar - inspired by bdsonline.vn topbar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-teal-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>BÁC SĨ THẬT · THÔNG TIN THẬT · GIÁ TRỊ THẬT</span>
            </span>
            <div className="h-3 w-px bg-slate-700"></div>
            <div className="flex items-center gap-1.5 hover:text-white transition">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Giờ làm việc: {CLINIC_INFO.workingHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition flex items-center gap-1">
              <span>Email: {CLINIC_INFO.email}</span>
            </a>
            <div className="h-3 w-px bg-slate-700"></div>
            <a href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`} className="text-orange-400 font-extrabold hover:text-orange-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              <span>Hotline 24/7: {CLINIC_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo - bdsonline clean style */}
        <button 
          onClick={() => handleNavClick('/')} 
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black shadow-md group-hover:bg-teal-800 transition">
            <Heart className="w-5 h-5 fill-white stroke-teal-700" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                MEDCARE <span className="text-teal-600">CLINIC</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">
              Kênh Thông Tin Y Tế & Đặt Lịch Khám Đa Khoa
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive 
                    ? 'text-teal-700 bg-teal-50/80 font-bold border-b-2 border-teal-700' 
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Login & [+ Đặt Lịch Khám] Pill Button */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick(user.role === 'admin' ? '/admin' : '/tai-khoan')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-800 text-xs font-bold transition border border-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="max-w-[90px] truncate">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="text-[9px] uppercase font-black bg-amber-400 text-slate-950 px-1 py-0.5 rounded">Admin</span>
                )}
              </button>
              <button
                onClick={onLogout}
                title="Đăng xuất"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-xs font-bold text-slate-700 hover:text-teal-700 px-3 py-2 transition"
            >
              Đăng nhập
            </button>
          )}

          {/* Primary CTA Button [+ Đặt Lịch Khám] like bdsonline [+ Đăng Tin] */}
          <button
            onClick={() => handleNavClick('/dat-lich')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-sm hover:shadow transition uppercase tracking-wider"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Đặt Lịch Khám</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('/dat-lich')}
            className="sm:hidden px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold"
          >
            + Đặt Lịch
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-bold text-sm ${
                  currentPath === item.path
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => handleNavClick(user.role === 'admin' ? '/admin' : '/tai-khoan')}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-50 text-teal-800 font-bold text-sm text-center"
              >
                Quản lý tài khoản ({user.name})
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 text-slate-800 font-bold text-sm text-center"
              >
                Đăng Nhập / Đăng Ký
              </button>
            )}

            <a
              href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-900 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Hotline: {CLINIC_INFO.hotline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
