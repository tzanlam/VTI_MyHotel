import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../../assets/method/support";
import { BookingService } from "../../service/BookingService";

export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_,{ thunkAPI }) => {
    try {
      console.log("call to api fetch bookings");
      return (await BookingService.fetchBookings()).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (bookingId, { thunkAPI }) => {
    try {
      return (await BookingService.fetchBookingById(bookingId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchBookingByDate = createAsyncThunk('booking/fetchBookingByDate',async ({startDate, endDate}, {thunkAPI})=>{
  try {
    const response = await BookingService.fetchBookingByDate(startDate, endDate)
    console.log("Data fetch Booking by date" + response.data);
    return response.data
  } catch (error) {
    handleError(error, thunkAPI)
  }
})

export const fetchBookingByAccount = createAsyncThunk(
  "booking/fetchBookingByAccount",
  async (accountId, { thunkAPI }) => {
    try {
      return (await BookingService.fetchBookingByAccount(accountId)).data;
    } catch (err) {
      handleError(err, thunkAPI);
    }
  }
);

export const postBooking = createAsyncThunk(
  "booking/postBooking",
  async (bookingRequest, { thunkAPI }) => {
    try {
      return (await BookingService.postBooking(bookingRequest)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const putStatusBooking = createAsyncThunk(
  "booking/putStatus",
  async ({ bookingId, statusBooking }, { thunkAPI }) => {
    try {
      return (await BookingService.putStatusBooking(bookingId, statusBooking))
        .data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

const BookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    booking: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingState: (state) => {
      state.bookings = [];
      state.booking = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        console.log("this is fulfilled: ", action.payload);
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingByDate.fulfilled, (state, action)=>{
        state.loading = false
        state.bookings = action.payload
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") && action.type !== fetchBookings && action.type !== fetchBookingByDate,
        (state, action) => {
          state.loading = false;
          state.booking = action.payload;
        }
      );
  },
});

export const { clearBookingSlice } = BookingSlice.actions;
export default BookingSlice.reducer;
