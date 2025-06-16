import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "./../../assets/method/support";
import { RoomService } from "../../service/RoomService";

export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (_, { thunkAPI }) => {
    try {
      const response = await RoomService.fetchRooms();
      return response.data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchRoomsByDate = createAsyncThunk(
  "room/fetchRoomsByDate",
  async ({ startDate, endDate }, { thunkAPI }) => {
    try {
      const response = await RoomService.fetchRoomsByDate({
        startDate,
        endDate,
      });
      return response.data;
    } catch (error) {
      handleError(error, thunkAPI);
    }
  }
);

export const fetchRoomById = createAsyncThunk('room/fetchRoomById', async(roomId, {thunkAPI}) => {
  try {
    const res = await RoomService.fetchRoomById(roomId);
    console.log("API response for fetchRoomById:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in fetchRoomById:", error);
    handleError(error, thunkAPI);
  }
});

export const putRoom = createAsyncThunk('room/putRoom', async({id, request}, {thunkAPI})=>{
  try {
    return (await (RoomService.putRoom(id, request))).data
  } catch (error) {
    handleError(error, thunkAPI)
  }
})

export const updateQuantityRoomByDate = createAsyncThunk('room/putQuantityByDate', async({roomId, startDate, endDate, quantity}, {thunkAPI})=>{
  try {
    return (await (RoomService.putQuantityRoomByDate(roomId, startDate,endDate,quantity))).data
  } catch (error) {
    handleError(error)
  }
})

const RoomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    room: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearRoomState: (state) => {
      state.rooms = [];
      state.room = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRoomsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = Array.isArray(action.payload)
          ? action.payload
          : Object.values(action.payload);
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(updateQuantityRoomByDate.fulfilled, (state, action)=>{
        state.loading = false
        state.room = action.payload
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
      );
  },
});

export const { clearRoomState } = RoomSlice.actions;
export default RoomSlice.reducer;