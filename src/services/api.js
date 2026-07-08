const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  googleLogin: (payload) =>
    request("/api/auth/google-login.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  adminLogin: (payload) =>
    request("/api/auth/admin-login.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  studentDashboard: (token) =>
    request("/api/student/dashboard.php", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  purchasedCourses: (token) =>
    request("/api/student/purchased-courses.php", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  liveClasses: (token) =>
    request("/api/student/live-classes.php", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  recordings: (token) =>
    request("/api/student/recordings.php", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createLiveClass: (token, payload) =>
    request("/api/master/create-live-class.php", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),
};