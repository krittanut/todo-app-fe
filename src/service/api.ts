import axios from 'axios';
import { cookies } from 'next/headers'

const api = axios.create({
    baseURL: 'https://candidate-assignment.neversitup.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        if (!config.url?.includes('/users') && !config.url?.includes('/auth/login')) {
            const token = cookies().get('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token.value}`;
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
        let message: string;
        if (error.config.url?.includes('/auth/login') && error.status === 401) {
            error.message = `username or password is invalid.`;
        } else {
            error.message = `Something went wrong. ${error.message}`;
        }
        return Promise.reject(error);
    }
);

export default api;