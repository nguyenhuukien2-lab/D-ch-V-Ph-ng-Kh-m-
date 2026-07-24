import React, { useState } from 'react';
import { 
  Users, Calendar, Stethoscope, DollarSign, Clock, CheckCircle2, 
  XCircle, Filter, Search, Plus, Edit, Trash2, ShieldAlert, FileText, Check, Eye
} from 'lucide-react';

export default function AdminPage({ 
  user, 
  appointments, 
  doctors, 
  services, 
  articles,
  onUpdateAppointmentStatus,
  onAddDoctor,
  onAddService,
  onOpenLogin
}) {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'doctors' | 'services' | 'articles'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // New Doctor Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocDegree, setNewDocDegree] = useState('BS.CKI');
  const [newDocSpec, setNewDocSpec] = useState('Nội khoa');

  // New Service Form State
  const [newSrvName, setNewSrvName] = useState('');
  const [newSrvCategory, setNewSrvCategory] = useState('Nội khoa');
  const [newSrvPrice, setNewSrvPrice] = useState(300000);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Quyền Truy Cập Quản Trị (Admin)</h2>
        <p className="text-xs text-slate-500">Khu vực dành riêng cho Ban Quản Lý Phòng Khám MedCare. Vui lòng đăng nhập tài khoản Admin.</p>
        <button
          onClick={onOpenLogin}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow transition"
        >
          Đăng Nhập Admin (admin / admin123)
        </button>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'Chờ xác nhận').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'Đã xác nhận').length;
  const estimatedRevenue = appointments.reduce((sum, a) => sum + (a.price || 350000), 0);

  // Filtered appointments list
  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesQuery = a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.phone.includes(searchQuery);
    return matchesStatus && matchesQuery;
  });

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    onAddDoctor({
      id: 'doc-' + Date.now(),
      name: newDocName,
      degree: newDocDegree,
      specialty: newDocSpec,
      experience: '10+ năm kinh nghiệm',
      hospital: 'Bệnh viện Đa Khoa',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      bio: 'Bác sĩ chuyên khoa tại MedCare Clinic.',
      scheduleDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
      rating: 5.0,
      reviewCount: 1
    });
    setShowAddDoctorModal(false);
    setNewDocName('');
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    onAddService({
      id: 'srv-' + Date.now(),
      name: newSrvName,
      category: newSrvCategory,
      price: Number(newSrvPrice),
      duration: '30 phút',
      description: 'Dịch vụ khám y khoa tại MedCare.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      popular: false
    });
    setShowAddServiceModal(false);
    setNewSrvName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase">
              Quản trị viên
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Hệ thống quản lý lịch hẹn, đội ngũ bác sĩ & dịch vụ khám MedCare Clinic</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddDoctorModal(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm bác sĩ</span>
          </button>
          <button 
            onClick={() => setShowAddServiceModal(true)}
            className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm dịch vụ</span>
          </button>
        </div>
      </div>

      {/* Overview Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{totalAppointments}</p>
            <p className="text-xs text-slate-500 font-semibold">Tổng lịch hẹn</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-amber-600">{pendingAppointments}</p>
            <p className="text-xs text-slate-500 font-semibold">Lịch chờ xác nhận</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{doctors.length}</p>
            <p className="text-xs text-slate-500 font-semibold">Bác sĩ làm việc</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">{estimatedRevenue.toLocaleString('vi-VN')} đ</p>
            <p className="text-xs text-slate-500 font-semibold">Doanh thu tạm tính</p>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'appointments', label: `Quản lý lịch hẹn (${appointments.length})` },
          { id: 'doctors', label: `Quản lý bác sĩ (${doctors.length})` },
          { id: 'services', label: `Quản lý dịch vụ (${services.length})` },
          { id: 'articles', label: `Tin tức bài viết (${articles.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-slate-900 text-amber-400 shadow'
                : 'bg-white text-slate-600 border hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: APPOINTMENT MANAGEMENT */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text"
                placeholder="Tìm mã hẹn, tên bệnh nhân, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border text-xs text-slate-800 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {['all', 'Chờ xác nhận', 'Đã xác nhận', 'Đã khám', 'Đã hủy'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                    statusFilter === st ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'Tất cả trạng thái' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Mã Hẹn</th>
                    <th className="p-4">Bệnh Nhân</th>
                    <th className="p-4">SĐT</th>
                    <th className="p-4">Dịch Vụ Khám</th>
                    <th className="p-4">Bác Sĩ</th>
                    <th className="p-4">Thời Gian</th>
                    <th className="p-4">Trạng Thái</th>
                    <th className="p-4 text-right">Cập Nhật</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-mono font-bold text-teal-700">{apt.code}</td>
                      <td className="p-4">
                        <strong className="text-slate-900 block">{apt.patientName}</strong>
                        <span className="text-[11px] text-slate-400">{apt.gender} ({apt.dob})</span>
                      </td>
                      <td className="p-4 font-semibold">{apt.phone}</td>
                      <td className="p-4">{apt.serviceName}</td>
                      <td className="p-4 text-teal-800 font-semibold">{apt.doctorName}</td>
                      <td className="p-4">
                        <span>{apt.date}</span>
                        <span className="block text-[11px] text-slate-400">{apt.timeSlot}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          apt.status === 'Đã xác nhận' ? 'bg-emerald-100 text-emerald-800' :
                          apt.status === 'Chờ xác nhận' ? 'bg-amber-100 text-amber-800' :
                          apt.status === 'Đã khám' ? 'bg-blue-100 text-blue-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={apt.status}
                          onChange={(e) => onUpdateAppointmentStatus(apt.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-semibold bg-white focus:outline-none focus:border-teal-600"
                        >
                          <option value="Chờ xác nhận">Chờ xác nhận</option>
                          <option value="Đã xác nhận">Đã xác nhận</option>
                          <option value="Đã khám">Đã khám</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: DOCTOR MANAGEMENT */}
      {activeTab === 'doctors' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">Danh Sách Bác Sĩ Phòng Khám</h3>
            <button 
              onClick={() => setShowAddDoctorModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800"
            >
              + Thêm Bác Sĩ Mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img src={doc.avatar} alt={doc.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                    <p className="text-xs text-teal-700 font-semibold">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-400">{doc.degree}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{doc.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES MANAGEMENT */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">Danh Sách Dịch Vụ & Bảng Giá</h3>
            <button 
              onClick={() => setShowAddServiceModal(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600"
            >
              + Thêm Dịch Vụ Mới
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs font-bold uppercase">
                  <th className="p-4">Tên Dịch Vụ</th>
                  <th className="p-4">Danh Mục</th>
                  <th className="p-4">Thời Gian</th>
                  <th className="p-4">Giá Khám</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {services.map((srv) => (
                  <tr key={srv.id}>
                    <td className="p-4 font-bold text-slate-900">{srv.name}</td>
                    <td className="p-4">{srv.category}</td>
                    <td className="p-4">{srv.duration}</td>
                    <td className="p-4 font-extrabold text-teal-700">{srv.price.toLocaleString('vi-VN')} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddDoctorSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base">Thêm Bác Sĩ Mới</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Họ tên bác sĩ *</label>
              <input 
                type="text" 
                required 
                placeholder="VD: ThS.BS Nguyễn Văn X"
                value={newDocName} 
                onChange={(e) => setNewDocName(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Học hàm / Học vị</label>
              <input 
                type="text" 
                value={newDocDegree} 
                onChange={(e) => setNewDocDegree(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chuyên khoa phụ trách</label>
              <select
                value={newDocSpec}
                onChange={(e) => setNewDocSpec(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs"
              >
                <option value="Nội khoa">Nội khoa</option>
                <option value="Nhi khoa">Nhi khoa</option>
                <option value="Sản phụ khoa">Sản phụ khoa</option>
                <option value="Nha khoa">Nha khoa</option>
                <option value="Da liễu">Da liễu</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddDoctorModal(false)} className="px-4 py-2 rounded-xl border text-xs">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs">Lưu bác sĩ</button>
            </div>
          </form>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddServiceSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base">Thêm Dịch Vụ Khám Mới</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên dịch vụ *</label>
              <input 
                type="text" 
                required 
                placeholder="VD: Gói khám tầm soát gan"
                value={newSrvName} 
                onChange={(e) => setNewSrvName(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Giá dịch vụ (VND)</label>
              <input 
                type="number" 
                value={newSrvPrice} 
                onChange={(e) => setNewSrvPrice(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddServiceModal(false)} className="px-4 py-2 rounded-xl border text-xs">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs">Lưu dịch vụ</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
