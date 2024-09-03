import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSpeakEnabled: true,
  isNotificationEnabled: true,
};

const isConfigurationEnabledSlice = createSlice({
  name: 'isConfigurationEnabled',
  initialState,
  reducers: {
    setIsSpeakEnabled: (state, action) => {
      state.isSpeakEnabled = action.payload;
    },
    setIsNotificationEnabled: (state, action) => {
      state.isNotificationEnabled = action.payload;
    },
  },
});

export const { setIsSpeakEnabled,setIsNotificationEnabled } = isConfigurationEnabledSlice.actions;
export const selectIsSpeakEnabled = (state) => state.isConfigurationEnabled.isSpeakEnabled;
export const selectIsNotificationEnabled = (state) => state.isConfigurationEnabled.isNotificationEnabled;

export default isConfigurationEnabledSlice.reducer;