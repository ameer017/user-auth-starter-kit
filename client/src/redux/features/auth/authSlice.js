import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    changePassword,
    createUser,
    deleteUser,
    forgotPassword,
    getUser,
    getUsers,
    loginStatus,
    loginUser,
    loginWithGoogle,
    logoutUser,
    resetPassword,
    sendVerificationEmail,
    updateUser,
    upgradeUser,
    verifyUser
} from "./authService";
import { toast } from "react-toastify"

// This represnts the default state/ condition for the users 
const initialState = {
    isLoggedIn: false, // user not logged in by default
    user: null, // no user
    users: [], // no users
    isError: false, // no error
    isSuccess: false, // no success
    isLoading: false, // not loading
    message: "", // no message
    verifiedUsers: 0, // no verified user
    suspendedUsers: 0, // no suspended user
};

export const register = createAsyncThunk(
    "auth/create-account",
    async (userData, thunkAPI) => {
        try {
            return await createUser(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login-user",
    async (userData, thunkAPI) => {
        try {
            return await loginUser(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout-user",
    async (_, thunkAPI) => {
        try {
            return await logoutUser();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const upgrade = createAsyncThunk(
    "auth/upgrade-user",
    async (userData, thunkAPI) => {
        try {
            return await upgradeUser(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const update = createAsyncThunk(
    "auth/update-user",
    async (userData, thunkAPI) => {
        try {
            return await updateUser(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const sendVE = createAsyncThunk(
    "auth/send-verification-email",
    async (_, thunkAPI) => {
        try {
            return await sendVerificationEmail();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const verify = createAsyncThunk(
    "auth/verify-user",
    async (verificationToken, thunkAPI) => {
        try {
            return await verifyUser(verificationToken);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const resetPwd = createAsyncThunk(
    "auth/reset-password",
    async ({ userData, resetToken }, thunkAPI) => {
        try {
            return await resetPassword(resetToken, userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const changePwd = createAsyncThunk(
    "auth/change-password",
    async (userData, thunkAPI) => {
        try {
            return await changePassword(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const forgotPwd = createAsyncThunk(
    "auth/forgot-password",
    async (userData, thunkAPI) => {
        try {
            return await forgotPassword(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loginGoogle = createAsyncThunk(
    "auth/google/callback",
    async (userToken, thunkAPI) => {
        try {
            return await loginWithGoogle(userToken);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loginState = createAsyncThunk(
    "auth/login-status",
    async (_, thunkAPI) => {
        try {
            return await loginStatus();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "auth/get-users",
    async (_, thunkAPI) => {
        try {
            return await getUsers();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getSingleUser = createAsyncThunk(
    "auth/get-user",
    async (id, thunkAPI) => {
        try {
            return await getUser(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteSingleUser = createAsyncThunk(
    "auth/delete-status",
    async (id, thunkAPI) => {
        try {
            return await deleteUser(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
        VERIFIED_USERS(state, action) {
            const array = [];
            state.users.map((user) => {
                const { isVerified } = user;
                return array.push(isVerified);
            });
            let count = 0;
            array.forEach((item) => {
                if (item === true) {
                    count += 1;
                }
            });
            state.verifiedUsers = count;
        },
        SUSPENDED_USERS(state, action) {
            const array = [];
            state.users.map((user) => {
                const { role } = user;
                return array.push(role);
            });
            let count = 0;
            array.forEach((item) => {
                if (item === "suspended") {
                    count += 1;
                }
            });
            state.suspendedUsers = count;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.isError = false;
                state.user = action.payload;
                console.log(action.payload)
                toast.success(action.payload)
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.isError = false;
                state.user = action.payload;
                console.log(action.payload)
                toast.success(action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })

            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
                state.user = null;
                toast.success(action.payload);
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(upgrade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(upgrade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(upgrade.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("User Updated");
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(sendVE.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendVE.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(sendVE.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(verify.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(verify.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(resetPwd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPwd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(resetPwd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(changePwd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePwd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(changePwd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(forgotPwd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPwd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(forgotPwd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(loginGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("Login Successful");
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })

            .addCase(loginState.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
                console.log(action.payload);
            })
            .addCase(loginState.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                console.log(action.payload);
            })

            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            .addCase(getSingleUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(getSingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })


            .addCase(deleteSingleUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSingleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(deleteSingleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
})

export const { RESET, VERIFIED_USER, SUSPENDED_USER } =
    authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;