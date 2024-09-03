import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from './../../utilities/apiCaller';

export const createLogin = createAsyncThunk(
  "/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/login", data);
      return response;
    } catch (err) {
      console.log("error",err.response.data.message)
      return rejectWithValue(err.response.data.message);

    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    success: false,
    error: '',
    errorMessage: "",
    loggeduser: [],
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.loggeduser = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createLogin.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(createLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.loggeduser = action.payload;
      state.error = '';
    });
    builder.addCase(createLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // state.errorMessage = action.payload.message;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;