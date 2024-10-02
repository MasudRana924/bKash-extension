import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import loginReducer from "./reducers/auth/verifyOTPSlice"; // Ensure this is correct
import isConfigurationEnabledReducer from './reducers/notification/notificationSlice';
import verifyOTPSlice from "./reducers/auth/verifyOTPSlice";
import registerSlice from "./reducers/auth/registerSlice";
import logger from "redux-logger";

// Persist configuration
const persistConfig = {
  key: "authentication",
  storage,
};
const persistedReducer = persistReducer(persistConfig, loginReducer);

// Root reducer with persisted reducer
const rootReducer = combineReducers({
  userDetails: persistedReducer,
  sendotp: registerSlice,
  otpVerification: verifyOTPSlice,
  isConfigurationEnabled: isConfigurationEnabledReducer,
});

// Middleware configuration
const middlewares = [];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// Store configuration
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  devTools: false, // Disable Redux DevTools
});

export default store;
export const persistor = persistStore(store);
