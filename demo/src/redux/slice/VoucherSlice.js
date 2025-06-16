import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../assets/method/support";
import { VoucherService } from "../../service/VoucherService";

export const fetchVouchers = createAsyncThunk(
  "voucher/fetchs",
  async ({ thunkAPI }) => {
    try {
      return (await VoucherService.fetchVouchers()).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchVoucherById = createAsyncThunk(
  "voucher/fetchVoucherById",
  async (voucherId, { thunkAPI }) => {
    try {
      return (await VoucherService.fetchVoucherById(voucherId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const postVoucher = createAsyncThunk(
  "voucher/postVoucher",
  async (voucherRequest, { thunkAPI }) => {
    try {
      return (await VoucherService.postVoucher(voucherRequest)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const putVoucher = createAsyncThunk(
  "voucher/putVoucher",
  async ({ voucherId, voucherRequest }, { thunkAPI }) => {
    try {
      return (await VoucherService.putVoucher(voucherId, voucherRequest)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const putExpiryVoucher = createAsyncThunk(
  "voucher/putExpiry",
  async ({ voucherId, date }, { thunkAPI }) => {
    try {
      return (await VoucherService.putExpiryVoucher(voucherId, date)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const deleteVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async (voucherId, { thunkAPI }) => {
    try {
      return (await VoucherService.deleteVoucher(voucherId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

const VoucherSlice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
    voucher: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVoucherState: (state) => {
      state.vouchers = [];
      state.voucher = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.fulfilled, (action, state) => {
        state.loading = false;
        state.vouchers = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") && action.type !== fetchVouchers,
        (action, state) => {
          state.loading = false;
          state.voucher = action.payload;
        }
      );
  },
});

export const { clearVoucherSlice } = VoucherSlice.actions;
export default VoucherSlice.reducer;
