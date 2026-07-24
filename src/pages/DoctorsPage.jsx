import React, { useState } from 'react';
import { Search, Award, Star, UserCheck } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';

export default function DoctorsPage({ doctors, onViewDoctor, onBookDoctor }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = [
    { id: 'all', name: 'Tất cả chuyên khoa' },
    { id: 'Nội khoa & Tim Mạch', name: 'Nội khoa & Tim Mạch' },
    { id: 'Sản Phụ Khoa', name: 'Sản Phụ Khoa' },
    { id: 'Nhi Khoa', name: 'Nhi Khoa' },
    { id: 'Nha Khoa Thẩm Mỹ', name: 'Nha Khoa' },
    { id: 'Da Liễu & Thẩm Mỹ Da', name: 'Da Liễu' },
    { id: 'Xét Nghiệm & Tầm Soát Ung Thư', name: 'Xét Nghiệm' }
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpec = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Chuyên gia y tế
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Đội Ngũ Bác Sĩ Chuyên Khoa Hàng Đầu
        </h1>
        <p className="text-slate-600 text-sm">
          Đội ngũ Bác sĩ tại MedCare Clinic có trình độ học hàm PGS.TS, Thạc sĩ, CKI, CKII từ các bệnh viện lớn Chợ Rẫy, Từ Dũ, Nhi Đồng 1.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-6">
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input 
            type="text"
            placeholder="Tìm theo tên bác sĩ hoặc chuyên khoa (VD: Nguyễn Văn An, Tim mạch...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {specialties.map((sp) => (
            <button
              key={sp.id}
              onClick={() => setSelectedSpecialty(sp.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedSpecialty === sp.id
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard 
              key={doc.id} 
              doctor={doc} 
              onViewProfile={onViewDoctor} 
              onBookDoctor={onBookDoctor} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 space-y-3">
          <UserCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">Không tìm thấy bác sĩ phù hợp</h3>
          <p className="text-xs text-slate-500">Thử tìm kiếm với tên hoặc chuyên khoa khác.</p>
        </div>
      )}

    </div>
  );
}
