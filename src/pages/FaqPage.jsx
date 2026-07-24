import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Calendar } from 'lucide-react';
import { FAQS, CLINIC_INFO } from '../data/mockData';

export default function FaqPage({ onNavigate }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Giải đáp thắc mắc
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Câu Hỏi Thường Gặp (FAQ)
        </h1>
        <p className="text-slate-600 text-sm">
          Tổng hợp các câu hỏi phổ biến nhất của bệnh nhân khi lần đầu đến khám tại MedCare.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-teal-700 transition"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-center text-white space-y-4">
        <h3 className="text-xl font-bold">Bạn vẫn còn thắc mắc cần tư vấn trực tiếp?</h3>
        <p className="text-slate-400 text-xs max-w-md mx-auto">
          Gọi điện cho tổng đài chăm sóc khách hàng MedCare để được nhân viên y tế hỗ trợ giải đáp 24/7.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <a
            href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Gọi Hotline: {CLINIC_INFO.hotline}</span>
          </a>
          <button
            onClick={() => onNavigate('/dat-lich')}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt lịch khám</span>
          </button>
        </div>
      </div>

    </div>
  );
}
