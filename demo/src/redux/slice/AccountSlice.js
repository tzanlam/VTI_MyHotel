import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../service/AccountService";

// Helper tạo các asyncThunk
const handleAsyncThunk = (type, fn) =>
  createAsyncThunk(type, async (arg, { rejectWithValue }) => {
    try {
      return (await fn(arg)).data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Operation failed");
    }
  });

export const fetchAccounts = handleAsyncThunk("account/fetchAccounts", () =>
  AccountService.fetchAccounts()
);
export const fetchAccountById = handleAsyncThunk("account/fetchAccountById",
  (id) => AccountService.fetchAccountById(id)
);
export const postAdmin = handleAsyncThunk("account/createAccountAdmin",
  (data) => AccountService.postAdmin(data)
);
export const postUser = handleAsyncThunk("account/createAccountUser", (data) =>
  AccountService.postUser(data)
);
export const putAccount = handleAsyncThunk("account/putAccount",
  ({ accountId, accountRequest }) =>
    AccountService.putAccount(accountId, accountRequest)
);
export const putEmail = handleAsyncThunk(
  "account/putEmail",
  ({ accountId, email }) => AccountService.putEmail(accountId, email)
);
export const putPassword = handleAsyncThunk(
  "account/putPassword",
  ({ accountId, password }) => AccountService.putPassword(accountId, password)
);
export const deleteAccount = handleAsyncThunk("account/delete", (id) =>
  AccountService.deleteAccount(id)
);

// Helper xử lý reducer cho asyncThunk
const addAsyncCases = (builder, thunk, assignTo = "account") => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      state[assignTo] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
};

const AccountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    account: null,
    error: null,
    loading: false,
  },
  reducers: {
    clearAccountState: (state) => {
      state.accounts = [];
      state.account = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    addAsyncCases(builder, fetchAccounts, "accounts");
    addAsyncCases(builder, fetchAccountById);
    addAsyncCases(builder, postAdmin);
    addAsyncCases(builder, postUser);
    addAsyncCases(builder, putAccount);
    addAsyncCases(builder, putEmail);
    addAsyncCases(builder, putPassword);
    addAsyncCases(builder, deleteAccount);
  },
});

export const { clearAccountState } = AccountSlice.actions;
export default AccountSlice.reducer;
