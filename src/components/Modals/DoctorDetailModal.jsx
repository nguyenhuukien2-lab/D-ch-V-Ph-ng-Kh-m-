import React from 'react';
import { X, Star, Award, Calendar, Clock, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

export default function DoctorDetailModal({ doctor, onClose, onBook }) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Doctor Header Banner */}
        <div className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-8 rounded-t-3xl flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <img 
            src={doctor.avatar} 
            alt={doctor.name} 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover object-top border-4 border-white/20 shadow-2xl shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-400/30 rounded-full text-xs font-semibold">
              {doctor.specialty}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{doctor.name}</h2>
            <p className="text-slate-300 text-sm font-medium">{doctor.degree}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-teal-200 pt-1">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <strong className="text-white font-bold">{doctor.rating}</strong> ({doctor.reviewCount} đánh giá)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-teal-300" />
                {doctor.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Body Info Details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Biography */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Tiểu sử & Kinh nghiệm công tác</span>
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {doctor.bio}
            </p>
          </div>

          {/* Hospital & Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
              <h5 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Nơi công tác từng đảm nhiệm</span>
              </h5>
              <p className="text-xs text-teal-800 font-medium">{doctor.hospital}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
              <h5 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Chứng chỉ & Đào tạo</span>
              </h5>
              <ul className="text-xs text-amber-900 space-y-1">
                {doctor.certificates?.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Lịch làm việc hàng tuần</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day) => {
                const isWorking = doctor.scheduleDays.includes(day);
                return (
                  <div
                    key={day}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex flex-col items-center min-w-[70px] ${
                      isWorking 
                        ? 'bg-teal-700 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-400 line-through opacity-60'
                    }`}
                  >
                    <span>{day}</span>
                    <span className="text-[10px] font-normal mt-0.5">
                      {isWorking ? 'Có lịch' : 'Nghỉ'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition"
            >
              Đóng lại
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(doctor);
              }}
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 text-center transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt lịch khám với {doctor.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
