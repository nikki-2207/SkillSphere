// ============================================
// SkillSphere Frontend Central API Client
// ============================================

const PROD_BACKEND_URL = "https://skillsphere-backend-chj9.onrender.com/api";
const DEV_BACKEND_URL = "http://localhost:8080/api";

function resolveApiBaseUrl() {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;
  let baseUrl = envUrl;

  if (!baseUrl || baseUrl.trim() === "") {
    // In production builds (e.g. Vercel), fall back safely to the deployed Render backend
    baseUrl = import.meta.env?.PROD ? PROD_BACKEND_URL : DEV_BACKEND_URL;
  }

  baseUrl = baseUrl.trim().replace(/\/+$/, "");

  // If the URL does not end with /api, append it cleanly
  if (!baseUrl.endsWith("/api")) {
    baseUrl += "/api";
  }

  return baseUrl;
}

export const API_BASE_URL = resolveApiBaseUrl();

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("skillsphere_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkError) {
    throw new Error(
      "Unable to connect to the backend server. If the backend is waking up on Render (free tier), please wait ~30-60 seconds and try again."
    );
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("skillsphere_token");
      localStorage.removeItem("skillsphere_user");
      throw new Error(
        data.message || "Invalid credentials or session expired. Please log in again."
      );
    }
    if (response.status === 403) {
      throw new Error(
        data.message || "Access denied. Please check your credentials or login again."
      );
    }
    if (response.status === 409) {
      throw new Error(
        data.message || "An account with this email address already exists."
      );
    }
    if (response.status === 404) {
      throw new Error(data.message || "The requested item was not found.");
    }
    throw new Error(
      data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

// Health check
export async function checkHealth() {
  return apiRequest("/health");
}

// Authentication
export async function login(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    localStorage.setItem("skillsphere_token", data.token);
    localStorage.setItem("skillsphere_user", JSON.stringify(data));
  }

  return data;
}

export async function register(name, email, password) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function logout() {
  localStorage.removeItem("skillsphere_token");
  localStorage.removeItem("skillsphere_user");
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("skillsphere_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Dashboard & Students
export async function getStudents(params = {}) {
  const query = new URLSearchParams();
  if (params.skill) query.append("skill", params.skill);
  if (params.department) query.append("department", params.department);
  if (params.year) query.append("year", params.year);
  const qStr = query.toString();
  return apiRequest(`/students${qStr ? `?${qStr}` : ""}`);
}

export async function getProjects() {
  return apiRequest("/projects");
}

export async function getSkills() {
  return apiRequest("/skills");
}

export async function createSkill(name, category) {
  return apiRequest("/skills", {
    method: "POST",
    body: JSON.stringify({ name, category }),
  });
}

// Profile
export async function getStudentProfile(userId) {
  return apiRequest(`/profile/${userId}`);
}

export async function saveStudentProfile(userId, profileData, isUpdate = true) {
  const method = isUpdate ? "PUT" : "POST";
  return apiRequest(`/profile/${userId}`, {
    method,
    body: JSON.stringify(profileData),
  });
}

// Student Skills
export async function getStudentSkills(userId) {
  return apiRequest(`/student-skills/${userId}`);
}

export async function addStudentSkill(userId, skillId, proficiency = "Intermediate") {
  return apiRequest(`/student-skills/${userId}`, {
    method: "POST",
    body: JSON.stringify({ skillId, proficiency }),
  });
}

export async function removeStudentSkill(userId, skillId) {
  return apiRequest(`/student-skills/${userId}/${skillId}`, {
    method: "DELETE",
  });
}

// Projects
export async function createProject(projectData) {
  return apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
}

export async function getProjectById(projectId) {
  return apiRequest(`/projects/${projectId}`);
}

export async function getProjectMembers(projectId) {
  return apiRequest(`/projects/${projectId}/members`);
}

export async function joinProject(projectId, userId, role = "Contributor") {
  return apiRequest(`/projects/${projectId}/members`, {
    method: "POST",
    body: JSON.stringify({ userId, role }),
  });
}

export async function addProjectSkill(projectId, skillId) {
  return apiRequest(`/projects/${projectId}/skills`, {
    method: "POST",
    body: JSON.stringify({ skillId }),
  });
}

// AI Features
export async function getTeamMatches(currentUserId, requiredSkills) {
  return apiRequest("/ai/team-match", {
    method: "POST",
    body: JSON.stringify({ currentUserId, requiredSkills }),
  });
}

export async function getLearningPath(userId, careerGoal) {
  return apiRequest("/ai/learning-path", {
    method: "POST",
    body: JSON.stringify({ userId, careerGoal }),
  });
}

export async function getSkillGap(userId, careerGoal) {
  return apiRequest("/ai/skill-gap", {
    method: "POST",
    body: JSON.stringify({ userId, careerGoal }),
  });
}

export async function getMentorRecommendations(careerGoal, requiredSkills) {
  return apiRequest("/ai/mentor-recommendations", {
    method: "POST",
    body: JSON.stringify({ careerGoal, requiredSkills }),
  });
}

// Mentors
export async function getMentors() {
  return apiRequest("/mentors");
}

export async function createMentorRequest(studentId, mentorId, message) {
  return apiRequest("/mentor-requests", {
    method: "POST",
    body: JSON.stringify({ studentId, mentorId, message }),
  });
}

export async function getMentorRequests(studentId) {
  return apiRequest(`/mentor-requests/student/${studentId}`);
}

// Study Groups
export async function getStudyGroups() {
  return apiRequest("/study-groups");
}

export async function createStudyGroup(groupData) {
  return apiRequest("/study-groups", {
    method: "POST",
    body: JSON.stringify(groupData),
  });
}

export async function getStudyGroupMembers(groupId) {
  return apiRequest(`/study-groups/${groupId}/members`);
}

export async function joinStudyGroup(groupId, userId) {
  return apiRequest(`/study-groups/${groupId}/members`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function leaveStudyGroup(groupId, userId) {
  return apiRequest(`/study-groups/${groupId}/members/${userId}`, {
    method: "DELETE",
  });
}
