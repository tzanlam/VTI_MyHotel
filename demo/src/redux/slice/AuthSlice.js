import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../service/AuthService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = (await AuthService.login(email, password)).data;
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    accountId: null,
    avatar: null,
    fullName: null,
    loading: false,
    error: null,
    position: [],
    isAuthentication: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.accountId = null;
      state.avatar = null;
      state.fullName = null;
      state.loading = false;
      state.error = null;
      state.position = [];
      state.isAuthentication = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.accountId = action.payload.accountId;
        localStorage.setItem('token', action.payload.token)
        state.avatar = action.payload.avatar;
        state.fullName = action.payload.fullName;
        state.loading = false;
        state.error = null;
        state.position = action.payload.authorities || [];
        state.isAuthentication = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
