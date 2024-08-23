import axios from 'axios';

const api = axios.create({
    baseURL: 'https://candidate-assignment.neversitup.com',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
});

api.interceptors.request.use(
    (config) => {
        if (!config.url?.includes('/users') && config.method !== "POST") {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Something went wrong.')
        }
        return Promise.reject(error);
    }
);

export default api;