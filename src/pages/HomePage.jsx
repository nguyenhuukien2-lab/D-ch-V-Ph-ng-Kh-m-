import React, { useState } from 'react';
import { 
  Calendar, Phone, ShieldCheck, Award, Heart, Star, ChevronRight, 
  CheckCircle2, Clock, MapPin, User, Sparkles, Search, Stethoscope, ArrowRight, Check, Eye
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import DoctorCard from '../components/DoctorCard';
import { CLINIC_INFO } from '../data/mockData';

export default function HomePage({ 
  services, 
  doctors, 
  articles, 
  reviews, 
  onNavigate, 
  onViewService, 
  onViewDoctor, 
  onViewArticle,
  onQuickBook
}) {
  // Hero Filter Bar state (inspired by bdsonline tabs)
  const [activeSearchTab, setActiveSearchTab] = useState('dich-vu'); // 'dich-vu' | 'bac-si' | 'tam-soat'
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterDate, setFilterDate] = useState('2026-07-25');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (activeSearchTab === 'bac-si') {
      onNavigate(`/bac-si${filterCategory !== 'all' ? `?spec=${filterCategory}` : ''}`);
    } else {
      onNavigate(`/dat-lich${filterCategory !== 'all' ? `?service=${filterCategory}` : ''}`);
    }
  };

  return (
    <div className="space-y-12 pb-16 bg-slate-50">

      {/* 1. TOP BANNER SLOGAN BAR - Inspired by bdsonline slogan */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-center text-xs font-extrabold tracking-wider text-slate-700 uppercase">
        <span>BÁC SĨ THẬT · THÔNG TIN THẬT · GIÁ TRỊ THẬT</span>
      </div>

      {/* 2. HERO SECTION WITH TABBED SEARCH BOX (bdsonline style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-slate-800">
          
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80" 
              alt="Phòng khám MedCare Clinic" 
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Nền Tảng Dữ Liệu Y Tế & Kết Nối Bác Sĩ Uy Tín</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Tra Cứu Dịch Vụ Khám & Đặt Lịch Bác Sĩ Chuyên Khoa
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Thông tin gói khám được MedCare tổng hợp, chọn lọc và trình bày rõ ràng, giúp bệnh nhân dễ dàng tham khảo, so sánh và đặt lịch hẹn trực tiếp.
            </p>

            {/* TABBED SEARCH BOX - BDSONLINE STYLE */}
            <div className="bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-left space-y-4 max-w-3xl mx-auto mt-6">
              
              {/* Tab Pills */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <button
                  onClick={() => setActiveSearchTab('dich-vu')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                    activeSearchTab === 'dich-vu' 
                      ? 'bg-teal-700 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Dịch Vụ Khám
                </button>
                <button
                  onClick={() => setActiveSearchTab('bac-si')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                    activeSearchTab === 'bac-si' 
                      ? 'bg-teal-700 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Đội Ngũ Bác Sĩ
                </button>
                <button
                  onClick={() => setActiveSearchTab('tam-soat')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                    activeSearchTab === 'tam-soat' 
                      ? 'bg-teal-700 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Gói Tầm Soát
                </button>
              </div>

              {/* Filter Inputs Grid */}
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Chuyên khoa</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
                  >
                    <option value="all">Tất cả chuyên khoa</option>
                    <option value="Nội khoa">Nội Khoa & Tim Mạch</option>
                    <option value="Sản phụ khoa">Sản Phụ Khoa 4D</option>
                    <option value="Nhi khoa">Nhi Khoa & Dinh Dưỡng</option>
                    <option value="Nha khoa">Nha Khoa Thẩm Mỹ</option>
                    <option value="Da liễu">Da Liễu & Bio-Light</option>
                    <option value="Xét nghiệm">Xét Nghiệm ISO 15189</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Bác sĩ phụ trách</label>
                  <select
                    value={filterDoctor}
                    onChange={(e) => setFilterDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
                  >
                    <option value="all">Tất cả bác sĩ chuyên khoa</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Ngày mong muốn</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow transition flex items-center justify-center gap-1.5 uppercase"
                  >
                    <Search className="w-4 h-4 stroke-[3]" />
                    <span>Tìm Kiếm</span>
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </section>

      {/* 3. PLATFORM VALUE PROP BANNER (bdsonline intro style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                MedCare Clinic – Nền tảng tham khảo thông tin y tế & kết nối Bác sĩ chuyên khoa uy tín
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-4xl">
                Cung cấp thông tin dự án gói khám được biên soạn tập trung, giúp bệnh nhân dễ dàng so sánh, lựa chọn và kết nối với bác sĩ phù hợp nhu cầu riêng.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/gioi-thieu')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shrink-0"
            >
              Tìm hiểu thêm →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-teal-700 font-bold block">1. Thông tin thật 100%</strong>
              <p className="text-slate-500 text-[11px]">Dữ liệu dịch vụ, bác sĩ và bảng giá niêm yết rõ ràng chuẩn Y tế.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-teal-700 font-bold block">2. Đội ngũ bác sĩ chuyên khoa</strong>
              <p className="text-slate-500 text-[11px]">Bệnh nhân chủ động chọn bác sĩ theo trình độ, bằng cấp và chuyên khoa.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-teal-700 font-bold block">3. Quy trình không chờ đợi</strong>
              <p className="text-slate-500 text-[11px]">Đặt lịch online chọn khung giờ trống, vào thẳng phòng bác sĩ.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-teal-700 font-bold block">4. Trả kết quả online</strong>
              <p className="text-slate-500 text-[11px]">Hồ sơ sức khỏe lưu trữ bảo mật trên tài khoản cá nhân.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 1: FEATURED SERVICES (Dự án nổi bật style bdsonline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-teal-700 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Dịch Vụ Khám Nổi Bật
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('/dich-vu')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 transition flex items-center gap-1"
          >
            <span>Xem tất cả dịch vụ →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onViewDetail={onViewService} 
              onBookService={(srv) => onNavigate(`/dat-lich?service=${srv.id}`)} 
            />
          ))}
        </div>
      </section>

      {/* 5. SECTION 2: LEADING DOCTORS (Mua bán bđs style -> Đội ngũ bác sĩ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-orange-600 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Đội Ngũ Bác Sĩ Tiêu Biểu
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('/bac-si')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 transition flex items-center gap-1"
          >
            <span>Xem tất cả bác sĩ →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 3).map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onViewProfile={onViewDoctor} 
              onBookDoctor={(doc) => onNavigate(`/dat-lich?doctor=${doc.id}`)} 
            />
          ))}
        </div>
      </section>

      {/* 6. SECTION 3: HEALTH CHECKUP PACKAGES (Cho thuê style -> Gói Tầm Soát Sức Khỏe) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-emerald-600 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Gói Tầm Soát & Chẩn Đoán Y Khoa
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('/bang-gia')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 transition flex items-center gap-1"
          >
            <span>Xem bảng giá niêm yết →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(4, 8).map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onViewDetail={onViewService} 
              onBookService={(srv) => onNavigate(`/dat-lich?service=${srv.id}`)} 
            />
          ))}
        </div>
      </section>

      {/* 7. SECTION 4: MEDICAL NEWS & MARKET UPDATES (2 COLUMNS LIKE BDSONLINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cập Nhật Y Học & Bài Viết Mới */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 uppercase">
                Cập Nhật Tiến Độ & Y Học Thường Thức
              </h3>
              <button 
                onClick={() => onNavigate('/tin-tuc')}
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Xem tất cả bài viết →
              </button>
            </div>

            {/* Featured Main Article */}
            {articles[0] && (
              <div 
                onClick={() => onViewArticle(articles[0])}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group grid grid-cols-1 sm:grid-cols-12"
              >
                <div className="sm:col-span-6 h-56 sm:h-auto overflow-hidden">
                  <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="sm:col-span-6 p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                      {articles[0].category}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition mt-2 leading-snug">
                      {articles[0].title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 mt-1 leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>{articles[0].author}</span>
                    <span>{articles[0].publishedAt}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stacked list articles */}
            <div className="space-y-3">
              {articles.slice(1, 4).map((art) => (
                <div 
                  key={art.id}
                  onClick={() => onViewArticle(art)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow transition cursor-pointer flex items-center gap-4 group"
                >
                  <img src={art.image} alt={art.title} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition truncate">{art.title}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{art.excerpt}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{art.publishedAt} • {art.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bảng Giá & Chính Sách Khám Bệnh (bdsonline style) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 uppercase">
                Bảng Giá & Chính Sách Khám
              </h3>
              <button 
                onClick={() => onNavigate('/bang-gia')}
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Chi tiết →
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase text-teal-800">Thông báo chính sách khám</span>
                <p className="text-xs font-bold text-slate-900">Chi phí khám niêm yết 100% theo quy định Sở Y Tế</p>
                <p className="text-[11px] text-slate-500">Bệnh nhân được tư vấn phác đồ và báo giá chính xác trước khi thực hiện dịch vụ.</p>
              </div>

              <div className="space-y-3 divide-y divide-slate-100 text-xs">
                {services.slice(0, 5).map((s) => (
                  <div key={s.id} className="pt-2.5 first:pt-0 flex items-center justify-between">
                    <span className="font-bold text-slate-800 truncate pr-2">{s.name}</span>
                    <span className="font-extrabold text-teal-700 shrink-0">{s.price.toLocaleString('vi-VN')} đ</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('/bang-gia')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition text-center"
              >
                Tra cứu toàn bộ bảng giá
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SECTION 5: CUSTOMER REVIEWS & SLOGAN BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-teal-400 font-extrabold text-xs uppercase tracking-wider">
              Bác Sĩ Thật · Thông Tin Thật · Giá Trị Thật
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Đánh Giá Từ Bệnh Nhân Đã Khám</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-xs italic leading-relaxed">"{review.comment}"</p>
                <div className="pt-2 border-t border-slate-700/80 flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-xs text-white">{review.name}</h5>
                    <span className="text-[10px] text-teal-400 block">{review.serviceName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECTION 6: INTERACTIVE MAP & CONTACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-teal-700 font-extrabold text-xs uppercase tracking-wider">Vị trí phòng khám</span>
            <h3 className="text-2xl font-extrabold text-slate-900">Địa Chỉ Khám MedCare Clinic</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{CLINIC_INFO.address}</p>

            <div className="space-y-2 text-xs text-slate-700 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Hotline tư vấn: <strong>{CLINIC_INFO.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Giờ làm việc: <strong>{CLINIC_INFO.workingHours}</strong></span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-72 rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-slate-100">
            <iframe
              title="Phòng Khám MedCare Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237116!2d106.68006841480064!3d10.759922392332717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa0665189456578a1!2zTmd1eeG7hW4gVsSDbiBD4burLCBRdeG6rW4gNSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}
