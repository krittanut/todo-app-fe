'use server'
import api from "./api";

export type TodoCreate = {
    title: string,
    description: string
}

export type Todo = {
    created_at: string;
    created_by: {
        id: string;
        username: string;
    };
    description: string;
    id: string;
    title: string;
    updated_at: string;
}

export type ResponseTodo = {
    isSuccess: boolean;
    data: Todo[]
}

export const createTodo = async (data: TodoCreate) => {
    try {
        const response = await api.post('/todo', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchTodo = async (id: string, data: TodoCreate) => {
    try {
        const response = await api.patch(`/todo/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTodo = async (id: string) => {
    try {
        const response = await api.delete(`/todo/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getTodo = async (): Promise<ResponseTodo> => {
    try {
        const response = await api.get('/todo');
        return response.data;
    } catch (error) {
        throw error;
    }
};