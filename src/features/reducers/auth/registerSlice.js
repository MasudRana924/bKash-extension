import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from '../../../utilities/apiCaller';


// Async thunk for creating OTP
export const sendOTP = createAsyncThunk(
  "/createOtp",
  async (wallet_no, { rejectWithValue }) => {
    try {
      const response = await publicPost("/send-otp", wallet_no);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    success: false,
    error: '',
    wallet_no: '',
    pin: '',
    noresponse:false
  },
  reducers: {
    clearOTP: (state) => {
      state.isLoading = false;
      state.success = false;
      state.noresponse=null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOTP.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = null;
      state.wallet_no = action.meta.arg.phone;
      localStorage.setItem('wallet_no', action.meta.arg.wallet_no);
    });
    builder.addCase(sendOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.noresponse=true
    });
  },
});
export const { clearOTP } = registerSlice.actions;
export default registerSlice.reducer;