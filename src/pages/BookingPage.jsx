import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Calendar, Clock, User, Phone, Mail, Stethoscope, 
  ChevronRight, ArrowLeft, ShieldCheck, AlertCircle, FileText, Check, Copy, MessageSquare, Download
} from 'lucide-react';

export default function BookingPage({ 
  services, 
  doctors, 
  initialServiceId, 
  initialDoctorId, 
  onBookingComplete,
  user
}) {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || services[0]?.id || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId || 'any');
  const [selectedDate, setSelectedDate] = useState('2026-07-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 - 10:00');
  
  // Patient details
  const [patientName, setPatientName] = useState(user?.name || '');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '');
  const [patientEmail, setPatientEmail] = useState(user?.email || '');
  const [patientDob, setPatientDob] = useState('1992-06-15');
  const [patientGender, setPatientGender] = useState('Nam');
  const [medicalReason, setMedicalReason] = useState('');
  const [notes, setNotes] = useState('');

  // Booking Result State
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Synced selected objects
  const currentService = services.find(s => s.id === selectedServiceId) || services[0];
  const currentDoctor = selectedDoctorId === 'any' 
    ? { id: 'any', name: 'Bác sĩ bất kỳ theo ca trực', specialty: currentService?.category || 'Đa khoa' }
    : doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  const availableTimeSlots = [
    { slot: '08:00 - 09:00', period: 'Sáng', full: false },
    { slot: '09:00 - 10:00', period: 'Sáng', full: false },
    { slot: '10:00 - 11:00', period: 'Sáng', full: true }, // Disabled slot demo
    { slot: '11:00 - 12:00', period: 'Sáng', full: false },
    { slot: '13:30 - 14:30', period: 'Chiều', full: false },
    { slot: '14:30 - 15:30', period: 'Chiều', full: false },
    { slot: '15:30 - 16:30', period: 'Chiều', full: true },
    { slot: '16:30 - 17:30', period: 'Chiều', full: false },
    { slot: '18:00 - 19:00', period: 'Tối', full: false },
  ];

  const handleNextStep = () => {
    if (step === 4) {
      if (!patientName || !patientPhone) {
        alert('Vui lòng nhập Họ tên và Số điện thoại!');
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = () => {
    const trackingCode = 'MC-' + Math.floor(10000 + Math.random() * 90000);
    const newAppointment = {
      id: 'apt-' + Date.now(),
      code: trackingCode,
      patientName,
      phone: patientPhone,
      email: patientEmail || 'chua_cap_nhat@gmail.com',
      dob: patientDob,
      gender: patientGender,
      serviceId: currentService.id,
      serviceName: currentService.name,
      price: currentService.price,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'Chờ xác nhận',
      reason: medicalReason || 'Khám tổng quát',
      notes: notes,
      createdAt: new Date().toLocaleString('vi-VN')
    };

    setBookingSuccess(newAppointment);
    onBookingComplete(newAppointment);
  };

  const handleCopyCode = () => {
    if (bookingSuccess) {
      navigator.clipboard.writeText(bookingSuccess.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
          Đặt lịch trực tuyến 24/7
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          Đăng Ký Đặt Lịch Khám Bệnh
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Chỉ với 5 bước đơn giản để nhận mã xác nhận lịch hẹn và ưu tiên thăm khám.
        </p>
      </div>

      {/* Booking Form Card or Success Screen */}
      {!bookingSuccess ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Progress Bar (5 Steps) */}
          <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
              <span>Bước {step}/5</span>
              <span>
                {step === 1 && 'Chọn Dịch Vụ'}
                {step === 2 && 'Chọn Bác Sĩ'}
                {step === 3 && 'Chọn Ngày & Giờ'}
                {step === 4 && 'Thông Tin Bệnh Nhân'}
                {step === 5 && 'Xác Nhận & Hoàn Tất'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-gradient-to-r from-teal-500 to-emerald-400' : 'bg-slate-800'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* BƯỚC 1: CHỌN DỊCH VỤ */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                  <span>Bước 1: Chọn Chuyên Khoa & Dịch Vụ Khám</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => {
                    const isSelected = selectedServiceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
                          isSelected 
                            ? 'bg-teal-50/80 border-teal-600 shadow-md ring-2 ring-teal-600/20' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                          isSelected ? 'bg-teal-700 text-white border-teal-700' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {srv.category}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{srv.description}</p>
                          <div className="pt-1 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-teal-700">{srv.price.toLocaleString('vi-VN')} đ</span>
                            <span className="text-slate-400">Thời gian: {srv.duration}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BƯỚC 2: CHỌN BÁC SĨ */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  <span>Bước 2: Chọn Bác Sĩ Phụ Trách Khám</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option Bác sĩ bất kỳ */}
                  <div
                    onClick={() => setSelectedDoctorId('any')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                      selectedDoctorId === 'any'
                        ? 'bg-teal-50/80 border-teal-600 shadow-md ring-2 ring-teal-600/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedDoctorId === 'any' ? 'bg-teal-700 text-white border-teal-700' : 'border-slate-300'
                    }`}>
                      {selectedDoctorId === 'any' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Bác sĩ ngẫu nhiên theo ca trực</h4>
                      <p className="text-xs text-slate-500">Phòng khám tự xếp bác sĩ phù hợp với chuyên khoa bạn chọn.</p>
                    </div>
                  </div>

                  {doctors.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                          isSelected 
                            ? 'bg-teal-50/80 border-teal-600 shadow-md ring-2 ring-teal-600/20' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-teal-700 text-white border-teal-700' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h4>
                          <p className="text-xs text-teal-700 font-medium">{doc.specialty}</p>
                          <p className="text-[11px] text-slate-400">{doc.experience}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BƯỚC 3: CHỌN NGÀY VÀ KHUNG GIỜ */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span>Bước 3: Chọn Ngày Khám & Khung Giờ MONG Muốn</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Select Date Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Chọn ngày khám *</label>
                    <input 
                      type="date"
                      value={selectedDate}
                      min="2026-07-24"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-300 text-sm font-semibold text-slate-900 focus:border-teal-600 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400">Phòng khám mở cửa từ 07:30 - 20:00 Hàng ngày</p>
                  </div>

                  {/* Time slots selection */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Chọn khung giờ còn trống *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.map((ts, idx) => {
                        const isSelected = selectedTimeSlot === ts.slot;
                        return (
                          <button
                            key={idx}
                            disabled={ts.full}
                            onClick={() => setSelectedTimeSlot(ts.slot)}
                            className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                              ts.full 
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60' 
                                : isSelected 
                                  ? 'bg-teal-700 text-white border-teal-700 shadow' 
                                  : 'bg-white text-slate-800 border-slate-200 hover:border-teal-500'
                            }`}
                          >
                            <span>{ts.slot}</span>
                            <span className="block text-[10px] font-normal mt-0.5">
                              {ts.full ? 'Đã kín giờ' : ts.period}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BƯỚC 4: NHẬP THÔNG TIN BỆNH NHÂN */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span>Bước 4: Thông Tin Người Khám Bệnh</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên bệnh nhân *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại * (Nhận SMS xác nhận)</label>
                    <input 
                      type="tel"
                      required
                      placeholder="0908xxxxxx"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Email (Nhận phiếu hẹn PDF)</label>
                    <input 
                      type="email"
                      placeholder="example@gmail.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ngày sinh</label>
                      <input 
                        type="date"
                        value={patientDob}
                        onChange={(e) => setPatientDob(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Giới tính</label>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none"
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Triệu chứng / Lý do khám bệnh</label>
                    <textarea
                      rows={2}
                      placeholder="Mô tả ngắn triệu chứng bạn đang gặp phải (VD: Đau ngực nhẹ, sốt 2 ngày...)"
                      value={medicalReason}
                      onChange={(e) => setMedicalReason(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BƯỚC 5: XÁC NHẬN THÔNG TIN BẢNG TỔNG QUAN */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>Bước 5: Kiểm Tra & Xác Nhận Đặt Lịch</span>
                </h3>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-slate-400 block">Dịch vụ khám:</span>
                      <strong className="text-slate-900 text-sm">{currentService.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Bác sĩ phụ trách:</span>
                      <strong className="text-teal-700 text-sm">{currentDoctor.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Thời gian hẹn:</span>
                      <strong className="text-slate-900 text-sm">{selectedDate} ({selectedTimeSlot})</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Chi phí khám dự kiến:</span>
                      <strong className="text-orange-600 text-sm font-extrabold">{currentService.price.toLocaleString('vi-VN')} đ</strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-700">
                    <p><strong>Bệnh nhân:</strong> {patientName} ({patientGender})</p>
                    <p><strong>SĐT:</strong> {patientPhone} | <strong>Email:</strong> {patientEmail || 'Chưa cập nhật'}</p>
                    <p><strong>Lý do khám:</strong> {medicalReason || 'Khám tổng quát'}</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Lưu ý: Quý khách không cần đặt cọc trước. Vui lòng đến trước giờ hẹn 10 phút để làm thủ tục.</span>
                </div>
              </div>
            )}

            {/* Form Controls Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>
              ) : <div></div>}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <span>Tiếp tục (Bước {step + 1})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm shadow-xl hover:scale-105 transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>XÁC NHẬN ĐẶT LỊCH HẸN</span>
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* POST-BOOKING SUCCESS SCREEN & RECEIPT */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-8 animate-in zoom-in-95 duration-300 max-w-2xl mx-auto">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              Đặt Lịch Khám Thành Công!
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Mã Lịch Hẹn: {bookingSuccess.code}</h2>
            <p className="text-xs text-slate-500">Phòng khám đã gửi xác nhận đến SĐT {bookingSuccess.phone}</p>
          </div>

          {/* Tracking Code Copy box */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Mã tra cứu lịch hẹn:</span>
              <strong className="text-xl text-teal-400 font-mono tracking-widest">{bookingSuccess.code}</strong>
            </div>
            <button 
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Đã sao chép' : 'Sao chép mã'}</span>
            </button>
          </div>

          {/* Details receipt */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Bệnh nhân:</span>
              <strong className="text-slate-900 font-bold">{bookingSuccess.patientName}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Dịch vụ:</span>
              <strong className="text-slate-900">{bookingSuccess.serviceName}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Bác sĩ:</span>
              <strong className="text-teal-700">{bookingSuccess.doctorName}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Thời gian hẹn:</span>
              <strong className="text-slate-900">{bookingSuccess.date} ({bookingSuccess.timeSlot})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Trạng thái:</span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">Chờ xác nhận</span>
            </div>
          </div>

          {/* Simulated SMS Alert Simulation Box */}
          <div className="p-4 rounded-2xl bg-teal-950 text-teal-100 border border-teal-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <MessageSquare className="w-4 h-4" />
              <span>[Mô phỏng tin nhắn SMS gửi tới điện thoại {bookingSuccess.phone}]</span>
            </div>
            <p className="font-mono text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-800 text-teal-300 leading-relaxed">
              [MEDCARE] Xac nhan lich hen {bookingSuccess.code} cho {bookingSuccess.patientName}. Ngay: {bookingSuccess.date} luc {bookingSuccess.timeSlot}. Dia chi: 123 Nguyen Van Cu, Q5. Hotline: 1900 6868.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setBookingSuccess(null);
                setStep(1);
              }}
              className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition text-center"
            >
              Đặt thêm lịch hẹn khác
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Tải phiếu hẹn PDF</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
