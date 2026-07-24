import React from 'react';
import { Award, ShieldCheck, Heart, Users, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function AboutPage({ onNavigate }) {
  const facilities = [
    {
      title: 'Phòng Xét Nghiệm Tự Động ISO 15189',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      desc: 'Hệ thống Cobas Roche Đức phân tích tự động 100% mẫu máu, trả kết quả chỉ trong 60 phút.'
    },
    {
      title: 'Máy Siêu Âm 4D HD-Live Thế Hệ Mới',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      desc: 'Dựng hình thai nhi 4D sắc nét, chẩn đoán dị tật sớm với độ chính xác trên 99%.'
    },
    {
      title: 'Phòng Thăm Khám & Chờ Khám 5 Sao',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      desc: 'Không gian riêng tư, vô trùng tuyệt đối, máy lọc không khí HEPA diệt vi khuẩn liên tục.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Về MedCare Clinic
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          Hành Trình 15+ Năm Vì Sức Khỏe Cộng Đồng
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Được thành lập từ năm 2011, MedCare Clinic tự hào là địa chỉ khám chữa bệnh đa khoa uy tín hàng đầu, mang lại niềm tin y tế cho hàng trăm ngàn gia đình Việt.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-teal-400" />
          </div>
          <h3 className="text-2xl font-bold">Sứ Mệnh</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Đặt Y Đức và Sự An Toàn của bệnh nhân làm kim chỉ nam. Mang đến dịch vụ chẩn đoán chuẩn xác, phác đồ điều trị cá thể hóa và chi phí hợp lý.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Tầm Nhìn</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Trở thành chuỗi Phòng Khám Đa Khoa ứng dụng công nghệ Y tế Số (Digital Healthcare) hiện đại nhất, cho phép bệnh nhân theo dõi sức khỏe mọi lúc mọi nơi.
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-teal-400/20 text-teal-200 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Giá Trị Cốt Lõi</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>Tận Tâm - Tín Nhiệm - Tiên Phong - Minh Bạch.</strong> Mọi kết quả khám đều được thẩm định bởi Hội đồng y khoa Chuyên gia.
          </p>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-wider">Cơ sở vật chất</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Trang Thiết Bị Y Khoa Hiện Đại</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm space-y-4 p-4">
              <div className="h-48 overflow-hidden rounded-2xl">
                <img src={fac.image} alt={fac.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 px-2">
                <h4 className="font-bold text-slate-900 text-base">{fac.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold">Trải Nghiệm Dịch Vụ Khám Bệnh Đẳng Cấp 5 Sao</h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Đội ngũ bác sĩ MedCare luôn sẵn sàng hỗ trợ bạn và gia đình. Đặt lịch khám trực tuyến ngay hôm nay để nhận ưu đãi miễn phí đo huyết áp & điện tim.
        </p>
        <button
          onClick={() => onNavigate('/dat-lich')}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition"
        >
          Đặt Lịch Khám Ngay
        </button>
      </div>

    </div>
  );
}
