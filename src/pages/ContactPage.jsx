import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export default function ContactPage({ onShowToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast({
      title: 'Đã gửi liên hệ thành công!',
      message: `Cảm ơn ${name}. Bộ phận CSKH MedCare sẽ phản hồi qua SĐT ${phone} trong 15 phút.`
    });
    setName('');
    setPhone('');
    setEmail('');
    setContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Thông tin liên hệ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Kết Nối Với MedCare Clinic
        </h1>
        <p className="text-slate-600 text-sm">
          Chúng tôi luôn sẵn sàng lắng nghe và phản hồi mọi yêu cầu tư vấn sức khỏe của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Gửi Tin Nhắn Cho Phòng Khám</h3>
            <p className="text-xs text-slate-500">Điền thông tin bên dưới để được tư vấn trực tiếp.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="0908xxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Email</label>
              <input 
                type="email" 
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung tư vấn *</label>
              <textarea 
                rows={4}
                required 
                placeholder="Vui lòng nhập câu hỏi hoặc yêu cầu hỗ trợ..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Yêu Cầu Liên Hệ</span>
            </button>
          </form>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Thông Tin Chi Tiết</h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Địa chỉ phòng khám:</strong>
                  <span>{CLINIC_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Điện thoại Hotline 24/7:</strong>
                  <span className="text-orange-400 font-bold text-base">{CLINIC_INFO.hotline}</span>
                  <span className="block text-slate-400">Máy bàn: {CLINIC_INFO.phoneDirect}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Email hỗ trợ:</strong>
                  <span>{CLINIC_INFO.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Giờ làm việc:</strong>
                  <span>{CLINIC_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Social quick links */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <a
                href={`https://zalo.me/${CLINIC_INFO.zalo}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs text-center hover:bg-blue-500 transition"
              >
                Chat Zalo OA
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 text-white font-bold text-xs text-center hover:bg-indigo-500 transition"
              >
                Fanpage Facebook
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
