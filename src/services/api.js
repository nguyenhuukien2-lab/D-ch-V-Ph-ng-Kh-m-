import { 
  INITIAL_SERVICES, 
  INITIAL_DOCTORS, 
  INITIAL_ARTICLES, 
  INITIAL_REVIEWS, 
  INITIAL_APPOINTMENTS 
} from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper for fetch with timeout
async function fetchWithFallback(endpoint, options = {}, fallbackData = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[MedCare API Fallback] ${endpoint} -> using local data store:`, error.message);
    return fallbackData;
  }
}

export const apiService = {
  // Auth
  async register(userData) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend register unavailable, using client fallback');
    }
    return null;
  },

  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend login unavailable, using client fallback login');
    }
    return null;
  },


  // Services
  async getServices() {
    const data = await fetchWithFallback('/services', {}, INITIAL_SERVICES);
    return data && data.length > 0 ? data : INITIAL_SERVICES;
  },

  // Doctors
  async getDoctors() {
    const data = await fetchWithFallback('/doctors', {}, INITIAL_DOCTORS);
    return data && data.length > 0 ? data : INITIAL_DOCTORS;
  },

  // Appointments
  async getAppointments() {
    const data = await fetchWithFallback('/appointments', {}, INITIAL_APPOINTMENTS);
    return data && data.length > 0 ? data : INITIAL_APPOINTMENTS;
  },

  async createAppointment(appointmentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Lỗi đặt lịch hẹn');
      }

      return await res.json();
    } catch (e) {
      console.warn('Backend create appointment fallback:', e.message);
      // Fallback local creation
      const code = 'MC-' + Math.floor(10000 + Math.random() * 90000);
      return {
        id: 'apt-' + Date.now(),
        code,
        ...appointmentData,
        status: 'Chờ xác nhận',
        createdAt: new Date().toLocaleString('vi-VN')
      };
    }
  },

  async updateAppointmentStatus(id, status) {
    return await fetchWithFallback(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, { success: true });
  },

  // Backend Health Stats Check
  async getStats() {
    return await fetchWithFallback('/stats', {}, {
      totalAppointments: INITIAL_APPOINTMENTS.length,
      pendingCount: INITIAL_APPOINTMENTS.filter(a => a.status === 'Chờ xác nhận').length,
      totalRevenue: INITIAL_APPOINTMENTS.reduce((sum, a) => sum + a.price, 0),
      isDbConnected: false,
      dbStatus: 'Fallback Mock Data Mode'
    });
  }
};
