import { configureStore } from "@reduxjs/toolkit";
import config from "@/config/config";
import { useDispatch } from "react-redux";

import authReducer from "./slices/auth.slice";
import placeReducer from "./slices/place.slice";

// import articleReducer from "./slices/articleSlice";

const reducer = {
	auth: authReducer,
	place: placeReducer
	// article: articleReducer,
};

export const store = configureStore({
	reducer,
	devTools: config.env === "development",
	middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();