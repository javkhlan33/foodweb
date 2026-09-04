export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type AuthUser = {
  _id?: string;
  email?: string;
  role?: string;
};

export function saveAuth(token: string, user: AuthUser, email: string) {
  localStorage.setItem("nomnom_logged_in", "true");
  localStorage.setItem("nomnom_user_email", user.email || email);
  localStorage.setItem("nomnom_user_id", user._id ? String(user._id) : "");
  localStorage.setItem("nomnom_user_role", user.role || "USER");
  localStorage.setItem("token", token);
}

export function clearAuth() {
  localStorage.removeItem("nomnom_logged_in");
  localStorage.removeItem("nomnom_user_email");
  localStorage.removeItem("nomnom_user_id");
  localStorage.removeItem("nomnom_user_role");
  localStorage.removeItem("token");
}

export function getAuth() {
  if (typeof window === "undefined") {
    return {
      isLoggedIn: false,
      email: "",
      userId: "",
      role: "",
      token: "",
    };
  }

  const token = localStorage.getItem("token") || "";

  return {
    isLoggedIn:
      localStorage.getItem("nomnom_logged_in") === "true" && Boolean(token),
    email: localStorage.getItem("nomnom_user_email") || "",
    userId: localStorage.getItem("nomnom_user_id") || "",
    role: localStorage.getItem("nomnom_user_role") || "",
    token,
  };
}
