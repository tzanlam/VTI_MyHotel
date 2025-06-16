import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../../assets/method/support";
import { ReviewService } from "../../service/ReviewService";

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async ({ thunkAPI }) => {
    try {
      return (await ReviewService.fetchReviews()).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  "review/fetchReviewById",
  async (reviewId, { thunkAPI }) => {
    try {
      return (await ReviewService.fetchReviewById(reviewId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchReviewsByRoom = createAsyncThunk(
  "review/fetchReviewsByRoom",
  async (roomId, { thunkAPI }) => {
    try {
      return (await ReviewService.fetchReviewByRoom(roomId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchReviewByAccount = createAsyncThunk(
  "review/fetchReviewByAccount",
  async (accountId, { thunkAPI }) => {
    try {
      return (await ReviewService.fetchReviewByAccount(accountId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const postReview = createAsyncThunk(
  "review/postReview",
  async (reviewRequest, { thunkAPi }) => {
    try {
      return (await ReviewService.postReview(reviewRequest)).data;
    } catch (error) {
      handleError(error, thunkAPi);
    }
  }
);

export const putReview = createAsyncThunk(
  "review/putReview",
  async ({ reviewId, reviewRequest }, { thunkAPI }) => {
    try {
      return (await ReviewService.putReview(reviewId, reviewRequest)).data;
    } catch (err) {
      handleError(err, thunkAPI);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { thunkAPI }) => {
    try {
      return (await ReviewService.deleteReview(reviewId)).data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

const ReviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    review: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewState: (state) => {
      state.reviews = [];
      state.review = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducer: (builder) => {
    builder
      .addCase(fetchReviewById.fulfilled, (action, state) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (action, state) => {
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
          action.type.endsWith("/fulfilled") && action.type !== fetchReviewById,
        (state, action) => {
          state.loading = false;
          state.reviews = action.payload;
        }
      );
  },
});

export const { clearReviewSlice } = ReviewSlice.actions;
export default ReviewSlice.reducer;
