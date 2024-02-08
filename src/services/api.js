const API_BASE_URL = 'https://api.example.com';

const api = {
  get: (endpoint) => fetch(`${API_BASE_URL}/${endpoint}`).then(response => response.json()),
  post: (endpoint, data) => fetch(`${API_BASE_URL}/${endpoint}`, { method: 'POST', body: JSON.stringify(data) }).then(response => response.json()),
};

export default api;
