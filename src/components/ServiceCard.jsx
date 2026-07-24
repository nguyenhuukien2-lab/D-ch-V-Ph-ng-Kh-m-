import React from 'react';
import { Clock, ArrowRight, CheckCircle2, Tag, Calendar, Sparkles } from 'lucide-react';

export default function ServiceCard({ service, onViewDetail, onBookService }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Service Image with Category Badge */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-teal-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {service.category}
        </span>

        {/* Popular Tag */}
        {service.popular && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Nổi bật
          </span>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>Thời gian: {service.duration}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-700 transition line-clamp-2 leading-snug">
            {service.name}
          </h3>
          <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-teal-700 text-lg">
                {service.price.toLocaleString('vi-VN')} đ
              </span>
              {service.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {service.oldPrice.toLocaleString('vi-VN')} đ
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400">Giá khám niêm yết</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetail(service)}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              Chi tiết
            </button>
            <button
              onClick={() => onBookService(service)}
              className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow flex items-center gap-1 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Đặt lịch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
