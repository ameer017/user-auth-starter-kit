//  We'll  make requests to the backend routes with the functions here, by using axios library.
import axios from "axios"

// I beleive you should have the backend link saved in the .env file
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const URL = `${BACKEND_URL}/api/v1/auth/`; // represents the endpoint specified in server.js

// each of this function ihas an endpoint relative to their backend function logic
//  The functions with parameters means that we are sending the parameter values with the request [mostly post and patch methods].
export const createUser = async (userData) => {
    const response = await axios.post(`${URL}/create-account`, userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${URL}/login-user`, userData);
    return response.data;
}

export const logoutUser = async () => {
    const response = await axios.post(`${URL}/logout-user`);
    return response.data.message;
}

export const upgradeUser = async (userData) => {
    const response = await axios.post(`${URL}/upgrade-user`, userData);
    return response.data.message;
}

export const updateUser = async (userData) => {
    const response = await axios.patch(`${URL}/update-user`, userData);
    return response.data;
}

export const sendVerificationEmail = async () => {
    const response = await axios.post(`${URL}/send-verification-email`);
    return response.data.message;
}

export const verifyUser = async (verificationToken) => {
    const response = await axios.patch(`${URL}/verify-user/${verificationToken}`);
    return response.data.message;
}

export const resetPassword = async (userData, resetToken) => {
    const response = await axios.patch(`${URL}/reset-password/${resetToken}`, userData);
    return response.data.message;
}

export const changePassword = async (userData) => {
    const response = await axios.patch(`${URL}/change-password }`, userData);
    return response.data.message;
}

export const forgotPassword = async (userData) => {
    const response = await axios.patch(`${URL}/forgot-password }`, userData);
    return response.data.message;
}

export const loginWithGoogle = async (userToken) => {
    const response = await axios.post(`${URL}/google/callback }`, userToken);
    return response.data;
}

export const loginStatus = async () => {
    const response = await axios.get(`${URL}/login-status`);
    return response.data.message;
}

export const getUsers = async () => {
    const response = await axios.get(`${URL}/get-users`);
    return response.data;
}

export const getUser = async (id) => {
    const response = await axios.get(`${URL}/get-user/${id}`);
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await axios.get(`${URL}/delete-user/${id}`);
    return response.data;
}