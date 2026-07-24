import React, { useState } from 'react';
import { Search, Calendar, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export default function PricingPage({ services, onBookService }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả chuyên khoa' },
    { id: 'Nội khoa', name: 'Nội Khoa' },
    { id: 'Nội nhi', name: 'Nhi Khoa' },
    { id: 'Sản phụ khoa', name: 'Sản Phụ Khoa' },
    { id: 'Nha khoa', name: 'Nha Khoa' },
    { id: 'Da liễu', name: 'Da Liễu' },
    { id: 'Xét nghiệm', name: 'Xét Nghiệm' },
    { id: 'Tầm soát ung thư', name: 'Tầm Soát Ung Thư' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesQuery = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Bảng giá niêm yết
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Chi Phí Dịch Vụ Khám Minh Bạch 100%
        </h1>
        <p className="text-slate-600 text-sm">
          MedCare Clinic cam kết niêm yết đúng giá quy định Bộ Y Tế, không phụ thu bất kỳ khoản phí phát sinh ẩn nào.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text"
            placeholder="Tìm tên dịch vụ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                <th className="p-4 sm:p-5">Dịch Vụ Khám Bệnh</th>
                <th className="p-4 sm:p-5">Chuyên Khoa</th>
                <th className="p-4 sm:p-5">Thời Gian</th>
                <th className="p-4 sm:p-5">Giá Niêm Yết</th>
                <th className="p-4 sm:p-5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-teal-50/50 transition">
                  <td className="p-4 sm:p-5">
                    <span className="font-bold text-slate-900 text-sm block">{service.name}</span>
                    <span className="text-slate-500 line-clamp-1 mt-0.5">{service.description}</span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-semibold border border-teal-100">
                      {service.category}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500">{service.duration}</td>
                  <td className="p-4 sm:p-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-extrabold text-teal-700 text-base">
                        {service.price.toLocaleString('vi-VN')} đ
                      </span>
                      {service.oldPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {service.oldPrice.toLocaleString('vi-VN')} đ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <button
                      onClick={() => onBookService(service)}
                      className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow transition inline-flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Đặt lịch</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
