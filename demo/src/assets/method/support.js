
export const handleError = (error, thunkAPI) => {
   return thunkAPI.rejectWithValue(error.response?.data?.message)
}