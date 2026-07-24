import React from 'react';
import { 
  Heart, MapPin, Phone, Mail, Clock, ShieldCheck, 
  ChevronRight, Globe, Send, Award, Calendar 
} from 'lucide-react';

import { CLINIC_INFO } from '../data/mockData';

export default function Footer({ onNavigate }) {
  const handleNavClick = (path) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      
      {/* Top Banner Tagline - bdsonline footer style */}
      <div className="bg-slate-950 py-4 px-4 border-b border-slate-800 text-center">
        <span className="text-amber-400 font-black text-xs uppercase tracking-widest">
          BÁC SĨ THẬT · THÔNG TIN THẬT · GIÁ TRỊ THẬT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Clinic Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black">
                <Heart className="w-5 h-5 fill-white stroke-teal-600" />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">MEDCARE <span className="text-teal-400">CLINIC</span></span>
                <p className="text-[11px] text-slate-400">Hệ Thống Phòng Khám Đa Khoa Uy Tín</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              MedCare Clinic là nền tảng thông tin y tế và dịch vụ khám chữa bệnh đa khoa, cung cấp những thông tin gói khám minh bạch, cập nhật nhanh chóng và đáng tin cậy về bác sĩ, chuyên khoa, giúp bệnh nhân đưa ra quyết định thăm khám hiệu quả hơn.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-teal-400 font-bold block">"Bác Sĩ Thật – Thông Tin Thật – Giá Trị Thật"</span>
              <p>Giấy phép hoạt động khám chữa bệnh số: {CLINIC_INFO.license}</p>
            </div>
          </div>

          {/* Column 2: Information Links (2 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Thông Tin Phòng Khám
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('/')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Trang Chủ MedCare</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/gioi-thieu')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Giới Thiệu Về MedCare Clinic</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/dich-vu')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Danh Mục Dịch Vụ Khám</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/bac-si')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Đội Ngũ Bác Sĩ Chuyên Khoa</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/bang-gia')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Bảng Giá Khám Niêm Yết</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/tin-tuc')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Cẩm Nang Y Học & Tin Tức</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Member & Patient Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Dành Cho Bệnh Nhân
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('/dat-lich')} className="hover:text-teal-400 transition">
                  Đặt Lịch Khám Online
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/tai-khoan')} className="hover:text-teal-400 transition">
                  Tra Cứu Lịch Hẹn Khám
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/faq')} className="hover:text-teal-400 transition">
                  Hỏi Đáp FAQ Bệnh Nhân
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/lien-he')} className="hover:text-teal-400 transition">
                  Gửi Yêu Cầu Tư Vấn
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Connection (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Liên Hệ & Kết Nối
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-orange-400 font-bold text-sm">Hotline: {CLINIC_INFO.hotline}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Email: {CLINIC_INFO.email}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Giờ làm việc: {CLINIC_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNavClick('/dat-lich')}
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow transition text-center uppercase tracking-wider"
              >
                + Đặt Lịch Khám Mới
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & terms - bdsonline style */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 MedCare Clinic. Vận hành bởi Ban Quản Lý Phòng Khám Đa Khoa MedCare.</p>

          <div className="flex items-center gap-4">
            <button onClick={() => handleNavClick('/faq')} className="hover:text-slate-300 transition">Điều khoản sử dụng</button>
            <span>•</span>
            <button onClick={() => handleNavClick('/faq')} className="hover:text-slate-300 transition">Chính sách bảo mật</button>
            <span>•</span>
            <button onClick={() => handleNavClick('/faq')} className="hover:text-slate-300 transition">Miễn trừ trách nhiệm</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
