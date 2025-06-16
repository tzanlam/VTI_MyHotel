import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import AccountSlice from "./slice/AccountSlice";
import BookingSlice from "./slice/BookingSlice";
import ReviewSlice from "./slice/ReviewSlice";
import VoucherSlice from "./slice/VoucherSlice";
import RoomSlice from "./slice/RoomSlice"

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    account: AccountSlice,
    booking: BookingSlice,
    review: ReviewSlice,
    room: RoomSlice,
    voucher: VoucherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
