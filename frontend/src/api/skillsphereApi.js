
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://skillsphere-backend-chj9.onrender.com/api";

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("skillsphere_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}
