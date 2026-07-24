import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MessageSquare, X, CheckCircle, Bell } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function FloatingWidgets({ onNavigate, toast, onCloseToast }) {
  const [showZaloTooltip, setShowZaloTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowZaloTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-right duration-300 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <h5 className="font-bold text-sm text-teal-300">{toast.title || 'Thông báo'}</h5>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button 
            onClick={onCloseToast}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Desktop Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3">
        
        {/* Zalo OA Badge Tooltip */}
        {showZaloTooltip && (
          <div className="relative bg-white text-slate-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <span>Tư vấn qua Zalo 24/7!</span>
            <button onClick={() => setShowZaloTooltip(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Zalo Chat Button */}
        <a
          href={`https://zalo.me/${CLINIC_INFO.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:scale-110 transition duration-300 group"
          title="Chat Zalo hỗ trợ"
        >
          <span className="font-black text-xs tracking-tighter">ZALO</span>
        </a>

        {/* Phone Hotline Floating Button */}
        <a
          href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 hover:scale-110 transition duration-300"
          title="Gọi Hotline tư vấn"
        >
          <Phone className="w-6 h-6 animate-pulse" />
        </a>

        {/* Quick Booking Button */}
        <button
          onClick={() => {
            onNavigate('/dat-lich');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition duration-300"
        >
          <Calendar className="w-4 h-4" />
          <span>Đặt Lịch Ngay</span>
        </button>
      </div>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 md:hidden flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
        >
          <Phone className="w-4 h-4 text-orange-400" />
          <span>Gọi Hotline</span>
        </a>

        <button
          onClick={() => {
            onNavigate('/dat-lich');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-[1.4] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md"
        >
          <Calendar className="w-4 h-4" />
          <span>Đặt Lịch Khám Ngay</span>
        </button>
      </div>
    </>
  );
}
