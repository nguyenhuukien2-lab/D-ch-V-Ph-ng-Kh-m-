import React from 'react';
import { X, Clock, Tag, CheckCircle2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ServiceDetailModal({ service, onClose, onBook }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image header */}
        <div className="relative h-64 overflow-hidden bg-slate-900 rounded-t-3xl">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
              {service.category}
            </span>
            <h2 className="text-2xl font-extrabold">{service.name}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Thời gian thực hiện: {service.duration}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Price box */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-teal-700 font-medium">Chi phí dịch vụ niêm yết:</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-teal-900">
                  {service.price.toLocaleString('vi-VN')} đ
                </span>
                {service.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {service.oldPrice.toLocaleString('vi-VN')} đ
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 bg-teal-200/60 text-teal-900 rounded-xl">
              Minh bạch 100%
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Mô tả dịch vụ</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Procedure Steps */}
          {service.steps && service.steps.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Quy trình thực hiện chuẩn Y khoa</span>
              </h4>
              <div className="space-y-2.5">
                {service.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
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
                onBook(service);
              }}
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white font-bold text-sm shadow-lg shadow-teal-700/25 hover:bg-teal-800 text-center transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt lịch dịch vụ này ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
