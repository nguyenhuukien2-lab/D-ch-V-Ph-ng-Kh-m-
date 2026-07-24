import React, { useState } from 'react';
import { User, Calendar, Clock, CheckCircle2, AlertCircle, XCircle, FileText, Phone, Download, RefreshCw } from 'lucide-react';

export default function PatientPortalPage({ 
  user, 
  appointments, 
  onCancelAppointment, 
  onNavigate,
  onOpenLogin 
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'history'
  const [cancelModalApt, setCancelModalApt] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Tài Khoản Bệnh Nhân</h2>
        <p className="text-xs text-slate-500">Vui lòng đăng nhập để xem thông tin cá nhân và quản lý lịch hẹn khám của bạn.</p>
        <button
          onClick={onOpenLogin}
          className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow transition"
        >
          Đăng Nhập Hoặc Đăng Ký Ngay
        </button>
      </div>
    );
  }

  // Filter patient's appointments
  const patientApts = appointments.filter(a => a.phone === user.phone || a.patientName === user.name);

  const upcomingApts = patientApts.filter(a => a.status === 'Chờ xác nhận' || a.status === 'Đã xác nhận');
  const pastApts = patientApts.filter(a => a.status === 'Đã khám' || a.status === 'Đã hủy');

  const handleConfirmCancel = () => {
    if (cancelModalApt) {
      onCancelAppointment(cancelModalApt.id, cancelReason);
      setCancelModalApt(null);
      setCancelReason('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Patient Profile Header Card */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400 text-teal-300 flex items-center justify-center font-bold text-xl shrink-0">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-black">{user.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                Bệnh Nhân
              </span>
            </div>
            <p className="text-xs text-teal-200 mt-1">SĐT: {user.phone} | Email: {user.email || 'Chưa cập nhật'}</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/dat-lich')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow hover:scale-105 transition"
        >
          + Đặt Lịch Khám Mới
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'upcoming' ? 'bg-teal-700 text-white' : 'bg-white text-slate-600 border hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Lịch Hẹn Sắp Tới ({upcomingApts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'history' ? 'bg-teal-700 text-white' : 'bg-white text-slate-600 border hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Lịch Sử Khám ({pastApts.length})</span>
        </button>
      </div>

      {/* Content list */}
      {activeTab === 'upcoming' ? (
        <div className="space-y-4">
          {upcomingApts.length > 0 ? (
            upcomingApts.map((apt) => (
              <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Mã lịch hẹn:</span>
                    <strong className="text-teal-700 text-base ml-1.5 font-bold">{apt.code}</strong>
                  </div>
                  <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold ${
                    apt.status === 'Đã xác nhận' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Dịch vụ khám:</span>
                    <strong className="text-slate-900 text-sm">{apt.serviceName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Bác sĩ chuyên khoa:</span>
                    <strong className="text-teal-700">{apt.doctorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Thời gian khám:</span>
                    <strong className="text-slate-900">{apt.date} ({apt.timeSlot})</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">Tạo lúc: {apt.createdAt}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCancelModalApt(apt)}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition"
                    >
                      Hủy lịch hẹn
                    </button>
                    <button
                      onClick={() => onNavigate(`/dat-lich?service=${apt.serviceId}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      Đổi giờ hẹn
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">Bạn chưa có lịch hẹn sắp tới nào</h3>
              <p className="text-xs text-slate-500">Hãy đăng ký đặt lịch ngay để chọn bác sĩ và khung giờ ưng ý.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {pastApts.length > 0 ? (
            pastApts.map((apt) => (
              <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 opacity-90">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700">Mã: {apt.code}</span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    apt.status === 'Đã khám' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <p><strong>Dịch vụ:</strong> {apt.serviceName}</p>
                  <p><strong>Bác sĩ:</strong> {apt.doctorName}</p>
                  <p><strong>Ngày khám:</strong> {apt.date} ({apt.timeSlot})</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 text-xs text-slate-400">
              Chưa có lịch sử khám bệnh trước đây.
            </div>
          )}
        </div>
      )}

      {/* Cancel Appointment Confirmation Modal */}
      {cancelModalApt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border">
            <h3 className="font-bold text-slate-900 text-base">Xác Nhận Hủy Lịch Hẹn</h3>
            <p className="text-xs text-slate-600">
              Bạn có chắc chắn muốn hủy lịch hẹn <strong>{cancelModalApt.code}</strong> ({cancelModalApt.serviceName})?
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lý do hủy lịch (không bắt buộc):</label>
              <textarea 
                rows={2}
                placeholder="VD: Bận việc đột xuất, đổi kế hoạch..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalApt(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold hover:bg-slate-100"
              >
                Không, giữ lịch
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
