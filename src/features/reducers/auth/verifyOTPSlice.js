import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from '../../../utilities/apiCaller';

// Define the async thunk for OTP verification
export const verifyOTP = createAsyncThunk(
  "otp/verify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/verifyOTP", data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Create the slice
export const verifyOTPSlice = createSlice({
  name: "otpVerification",
  initialState: {
    isLoading: false,
    success: false,
    error: '',
    errorMessage: "",
    message: '',
    token: '',
    loggeduser: [],
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.loggeduser = [];
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';  
      state.message = '';
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = '';
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.loggeduser = action.payload;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { logout } = verifyOTPSlice.actions;
export default verifyOTPSlice.reducer;
