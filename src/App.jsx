import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';
import PricingPage from './pages/PricingPage';
import NewsPage from './pages/NewsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PatientPortalPage from './pages/PatientPortalPage';
import AdminPage from './pages/AdminPage';

// Modals
import DoctorDetailModal from './components/Modals/DoctorDetailModal';
import ServiceDetailModal from './components/Modals/ServiceDetailModal';
import NewsDetailModal from './components/Modals/NewsDetailModal';
import LoginModal from './components/Modals/LoginModal';

// Mock Initial Data
import { 
  INITIAL_SERVICES, 
  INITIAL_DOCTORS, 
  INITIAL_ARTICLES, 
  INITIAL_REVIEWS, 
  INITIAL_APPOINTMENTS 
} from './data/mockData';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [user, setUser] = useState(null);

  // Core Data States
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  // Query Params state for booking page
  const [bookingServiceId, setBookingServiceId] = useState('');
  const [bookingDoctorId, setBookingDoctorId] = useState('');

  // Modals state
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 5000);
  };

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      const [path, query] = hash.split('?');
      setCurrentPath(path);

      if (query) {
        const params = new URLSearchParams(query);
        if (params.get('service')) setBookingServiceId(params.get('service'));
        if (params.get('doctor')) setBookingDoctorId(params.get('doctor'));
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path) => {
    window.location.hash = path;
    const [purePath, query] = path.split('?');
    setCurrentPath(purePath);

    if (query) {
      const params = new URLSearchParams(query);
      if (params.get('service')) setBookingServiceId(params.get('service'));
      if (params.get('doctor')) setBookingDoctorId(params.get('doctor'));
    }
  };

  // Actions
  const handleBookingComplete = (newAppointment) => {
    setAppointments([newAppointment, ...appointments]);
    showToast(
      'Đặt lịch thành công!',
      `Mã lịch hẹn của bạn là ${newAppointment.code}. Đã gửi tin nhắn SMS xác nhận đến số ${newAppointment.phone}.`
    );
  };

  const handleUpdateAppointmentStatus = (aptId, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
    showToast('Cập nhật lịch hẹn', `Đã đổi trạng thái lịch hẹn sang: ${newStatus}`);
  };

  const handleCancelAppointment = (aptId, reason) => {
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: 'Đã hủy', cancelReason: reason } : a));
    showToast('Hủy lịch hẹn', 'Đã hủy lịch hẹn thành công.');
  };

  const handleAddDoctor = (newDoc) => {
    setDoctors([newDoc, ...doctors]);
    showToast('Thêm bác sĩ thành công', `Đã thêm ${newDoc.name} vào danh sách.`);
  };

  const handleAddService = (newSrv) => {
    setServices([newSrv, ...services]);
    showToast('Thêm dịch vụ thành công', `Đã thêm ${newSrv.name} vào hệ thống.`);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    showToast(
      'Đăng nhập thành công',
      `Xin chào ${userData.name}! ${userData.role === 'admin' ? 'Đã vào trang Quản trị viên.' : ''}`
    );
    if (userData.role === 'admin') {
      navigateTo('/admin');
    }
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Đã đăng xuất', 'Hẹn gặp lại bạn tại MedCare Clinic!');
    navigateTo('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* Shared Header Navigation */}
      <Header 
        currentPath={currentPath}
        onNavigate={navigateTo}
        user={user}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        appointmentsCount={appointments.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage 
            services={services}
            doctors={doctors}
            articles={articles}
            reviews={reviews}
            onNavigate={navigateTo}
            onViewService={setActiveServiceModal}
            onViewDoctor={setActiveDoctorModal}
            onViewArticle={setActiveArticleModal}
            onQuickBook={(quickData) => {
              setBookingServiceId(quickData.serviceId);
              setBookingDoctorId(quickData.doctorId);
              navigateTo('/dat-lich');
            }}
          />
        )}

        {currentPath === '/gioi-thieu' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPath === '/dich-vu' && (
          <ServicesPage 
            services={services}
            onViewService={setActiveServiceModal}
            onBookService={(srv) => {
              setBookingServiceId(srv.id);
              navigateTo('/dat-lich');
            }}
          />
        )}

        {currentPath === '/bac-si' && (
          <DoctorsPage 
            doctors={doctors}
            onViewDoctor={setActiveDoctorModal}
            onBookDoctor={(doc) => {
              setBookingDoctorId(doc.id);
              navigateTo('/dat-lich');
            }}
          />
        )}

        {currentPath === '/dat-lich' && (
          <BookingPage 
            services={services}
            doctors={doctors}
            initialServiceId={bookingServiceId}
            initialDoctorId={bookingDoctorId}
            onBookingComplete={handleBookingComplete}
            user={user}
          />
        )}

        {currentPath === '/bang-gia' && (
          <PricingPage 
            services={services}
            onBookService={(srv) => {
              setBookingServiceId(srv.id);
              navigateTo('/dat-lich');
            }}
          />
        )}

        {currentPath === '/tin-tuc' && (
          <NewsPage 
            articles={articles}
            onViewArticle={setActiveArticleModal}
          />
        )}

        {currentPath === '/faq' && (
          <FaqPage onNavigate={navigateTo} />
        )}

        {currentPath === '/lien-he' && (
          <ContactPage onShowToast={(t) => showToast(t.title, t.message)} />
        )}

        {currentPath === '/tai-khoan' && (
          <PatientPortalPage 
            user={user}
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            onNavigate={navigateTo}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {currentPath === '/admin' && (
          <AdminPage 
            user={user}
            appointments={appointments}
            doctors={doctors}
            services={services}
            articles={articles}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onAddDoctor={handleAddDoctor}
            onAddService={handleAddService}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Action Buttons & Notifications */}
      <FloatingWidgets 
        onNavigate={navigateTo}
        toast={toast}
        onCloseToast={() => setToast(null)}
      />

      {/* Detail Modals */}
      <DoctorDetailModal 
        doctor={activeDoctorModal}
        onClose={() => setActiveDoctorModal(null)}
        onBook={(doc) => {
          setBookingDoctorId(doc.id);
          navigateTo('/dat-lich');
        }}
      />

      <ServiceDetailModal 
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        onBook={(srv) => {
          setBookingServiceId(srv.id);
          navigateTo('/dat-lich');
        }}
      />

      <NewsDetailModal 
        article={activeArticleModal}
        onClose={() => setActiveArticleModal(null)}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
