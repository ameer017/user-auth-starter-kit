import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const URL = `${BACKEND_URL}/api/v1/auth/`;

exports.createUser = async (userData) => {
    const response = await axios.post(`${URL}/create-account`, userData);
    return response.data;
}

exports.loginUser = async (userData) => {
    const response = await axios.post(`${URL}/login-user`, userData);
    return response.data;
}

exports.logoutUser = async () => {
    const response = await axios.post(`${URL}/logout-user`);
    return response.data.message;
}

exports.upgradeUser = async (userData) => {
    const response = await axios.post(`${URL}/upgrade-user`, userData);
    return response.data.message;
}

exports.updateUser = async (userData) => {
    const response = await axios.patch(`${URL}/update-user`, userData);
    return response.data;
}

exports.sendVerificationEmail = async () => {
    const response = await axios.post(`${URL}/send-verification-email`);
    return response.data.message;
}

exports.verifyUser = async (verificationToken) => {
    const response = await axios.patch(`${URL}/verify-user/${verificationToken}`);
    return response.data.message;
}

exports.resetPassword = async (userData, resetToken) => {
    const response = await axios.patch(`${URL}/reset-password/${resetToken}`, userData);
    return response.data.message;
}

exports.changePassword = async (userData) => {
    const response = await axios.patch(`${URL}/change-password }`, userData);
    return response.data.message;
}

exports.forgotPassword = async (userData) => {
    const response = await axios.patch(`${URL}/forgot-password }`, userData);
    return response.data.message;
}

exports.loginWithGoogle = async (userToken) => {
    const response = await axios.post(`${URL}/google/callback }`, userToken);
    return response.data;
}

exports.loginStatus = async () => {
    const response = await axios.get(`${URL}/login-status`);
    return response.data.message;
}

exports.getUsers = async () => {
    const response = await axios.get(`${URL}/get-users`);
    return response.data;
}

exports.getUser = async (id) => {
    const response = await axios.get(`${URL}/get-user/${id}`);
    return response.data;
}

exports.deleteUser = async (id) => {
    const response = await axios.get(`${URL}/delete-user/${id}`);
    return response.data;
}