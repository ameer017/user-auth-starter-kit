import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const URL = `${BACKEND_URL}/api/v1/auth/`;

const createUser = async (userData) => {
    const response = await axios.post(`${URL}/create-account`, userData);
    return response.data;
}

const loginUser = async (userData) => {
    const response = await axios.post(`${URL}/login-user`, userData);
    return response.data;
}

const logoutUser = async () => {
    const response = await axios.post(`${URL}/logout-user`);
    return response.data.message;
}

const upgradeUser = async (userData) => {
    const response = await axios.post(`${URL}/upgrade-user`, userData);
    return response.data.message;
}

const updateUser = async (userData) => {
    const response = await axios.patch(`${URL}/update-user`, userData);
    return response.data;
}

const sendVerificationEmail = async () => {
    const response = await axios.post(`${URL}/send-verification-email`);
    return response.data.message;
}

const verifyUser = async (verificationToken) => {
    const response = await axios.patch(`${URL}/verify-user/${verificationToken}`);
    return response.data.message;
}

const resetPassword = async (userData, resetToken) => {
    const response = await axios.patch(`${URL}/reset-password/${resetToken}`, userData);
    return response.data.message;
}

const changePassword = async (userData) => {
    const response = await axios.patch(`${URL}/change-password }`, userData);
    return response.data.message;
}

const forgotPassword = async (userData) => {
    const response = await axios.patch(`${URL}/forgot-password }`, userData);
    return response.data.message;
}

const loginWithGoogle = async (userData) => {
    const response = await axios.patch(`${URL}/forgot-password }`, userData);
    return response.data.message;
}