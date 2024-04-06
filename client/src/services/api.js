const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const USER_API = `${API_BASE_URL}/users`;
export const USER_REGISTER_API = `${USER_API}/register`;
export const USER_LOGIN_API = `${USER_API}/login`;
