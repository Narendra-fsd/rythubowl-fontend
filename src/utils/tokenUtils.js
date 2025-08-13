const TOKEN_KEY = "rb_token";
const USER_KEY = "rb_user";

// Save token to localStorage
export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Get token from localStorage
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Remove token from localStorage
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Save user object to localStorage
export const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

// Get user object from localStorage
export const getUser = () => {
  const rawUser = localStorage.getItem(USER_KEY);
  try {
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

// Remove user object from localStorage
export const clearUser = () => localStorage.removeItem(USER_KEY);
