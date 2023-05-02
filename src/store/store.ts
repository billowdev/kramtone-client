import { configureStore } from "@reduxjs/toolkit";
import config from "@/config/config";
import { useDispatch } from "react-redux";

import authReducer from "./slices/auth.slice";
import placeReducer from "./slices/place.slice";
import groupDataReducer from "./slices/group-data.slice";
import productReducer from "./slices/product.slice";
import categoryReducer from "./slices/category.slice";
import colorSchemeReducer from "./slices/color-scheme.slice";
import userReducer from "./slices/user.slice";

const reducer = {
	auth: authReducer,
	place: placeReducer,
	groupData: groupDataReducer,
	product: productReducer,
	category: categoryReducer,
	colorScheme: colorSchemeReducer,
	user: userReducer,
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