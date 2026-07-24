import React from 'react';
import { Star, Award, Calendar, ChevronRight, CheckCircle2, Shield } from 'lucide-react';

export default function DoctorCard({ doctor, onViewProfile, onBookDoctor }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Doctor Photo Header */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-b from-teal-50 to-slate-100">
        <img 
          src={doctor.avatar} 
          alt={doctor.name} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-800 text-xs font-bold shadow flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
          <span>{doctor.rating}</span>
          <span className="text-slate-400 text-[10px]">({doctor.reviewCount})</span>
        </div>

        {/* Experience Pill */}
        <span className="absolute top-3 right-3 bg-teal-800/90 text-teal-200 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
          {doctor.experience}
        </span>

        {/* Doctor Title Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-teal-300 text-xs font-semibold tracking-wide uppercase">{doctor.degree}</p>
          <h3 className="font-bold text-lg text-white group-hover:text-teal-200 transition leading-tight mt-0.5">
            {doctor.name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Specialty tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            <span>Chuyên khoa: {doctor.specialty}</span>
          </div>

          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mt-1">
            {doctor.bio}
          </p>

          {/* Hospital experience */}
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <Shield className="w-3 h-3 text-teal-500" />
            <span className="truncate">{doctor.hospital}</span>
          </p>
        </div>

        {/* Schedule & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onViewProfile(doctor)}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center transition"
          >
            Hồ sơ chi tiết
          </button>
          <button
            onClick={() => onBookDoctor(doctor)}
            className="flex-1 py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold text-center shadow flex items-center justify-center gap-1 transition"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Đặt lịch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
