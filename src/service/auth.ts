'use server'
import api from "./api";
import { cookies } from 'next/headers'

type userCreate = {
    username: string,
    password: string
}

export const createUser = async (data: userCreate) => {
    try {
        const response = await api.post('/users', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const loginUser = async (data: userCreate) => {
    try {
        const response = await api.post('/auth/login', data);
        const cookieStorage = cookies();
        cookieStorage.set('token', response.data.access_token);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const logOut = async () => {
    const cookieStorage = cookies();
    cookieStorage.delete('token');
};