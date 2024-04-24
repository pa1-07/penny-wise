const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

export const USER_API = `${API_BASE_URL}/users`;
export const USER_REGISTER_API = `${USER_API}/register`;
export const USER_LOGIN_API = `${USER_API}/login`;
export const TRANSACTION_API = `${API_BASE_URL}/transaction`;
export const ADD_TRANSACTION_API = `${TRANSACTION_API}/add-transaction`;
export const EDIT_TRANSACTION_API = `${TRANSACTION_API}/edd-transaction`;
export const GET_TRANSACTION_API = `${TRANSACTION_API}/get-transaction`;
export const GET_DASHBOARD_API = `${TRANSACTION_API}/get-dashboard-transaction`;
export const DELETE_TRANSACTION_API = `${TRANSACTION_API}/delete-transaction`;
