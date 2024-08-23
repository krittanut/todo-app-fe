import api from "./api";


type userCreate = {
    username: string,
    password: string
}

export const createUser = async (data: userCreate) => {
    try {
        const response = await api.post('/users', data);
        console.log(response)
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
};