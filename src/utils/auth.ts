const USER_KEY = "ontime-user";
const CURRENT_USER_KEY = "ontime-current-user";

// Check if user is logged in
export function isLoggedIn(): boolean {
  return !!localStorage.getItem(CURRENT_USER_KEY);
}

// Register a new user
export function registerUser(email: string, password: string): boolean {
  const user = { email, password };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return true;
}

// Login with credentials
export function loginUser(email: string, password: string): boolean {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return false;

  const user = JSON.parse(userStr);
  const isValid = user.email === email && user.password === password;

  if (isValid) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)); // mark as logged in
    return true;
  }

  return false;
}

// Logout user
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
