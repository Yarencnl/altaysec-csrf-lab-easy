const BASE_URL = "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "İstek başarısız oldu");
  }

  return res.json();
}

export function login(username, password) {
  return request("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function getCurrentUser() {
  return request("/api/me");
}

export function logout() {
  return request("/api/logout");
}

export function getNotes() {
  return request("/api/notes");
}

export function addNote(title, content) {
  return request("/api/notes", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
}

export function deleteAccount() {
  return request("/api/delete-account", {
    method: "POST",
    body: JSON.stringify({ confirm: "SIL" }),
  });
}

export function getUserStatus(username) {
  return request(`/api/user-status/${username}`);
}

export function resetDemo() {
  return request("/api/reset-demo", { method: "POST" });
}