const API_URL = 'http://localhost:5019/api';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Email: email, Password: password }),
  });
  return response.json();
};

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Email: email, Password: password }),
  });
  return response.json();
};

export const setToken = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const getToken = () => {
  return localStorage.getItem('jwt');
};

export const removeToken = () => {
  localStorage.removeItem('jwt');
}; 