import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as authService from "@/services/auth.service"
import httpClient from "@/utils/httpClient.util";
import { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { AuthResponseType, IAuthPayload, UserState } from "@/models/auth.model";
import { RootState } from "@/store/store";
import { ISignIn } from 'models/auth.model';

interface SignAction {
	username: string
	password: string
}

const initialState: UserState = {
	accessToken: "",
	isAuthenticated: false,
	isAuthenticating: true,
	sub: "",
	role: "",
	username: ""
};

export const signIn = createAsyncThunk(
	"auth/signin",
	async (credential: SignAction) => {
		const response = await authService.signIn(credential);

		if (response.token === "") {
			throw new Error("login failed");
		}
		httpClient.interceptors.request.use((config?: AxiosRequestConfig | any) => {
			if (config && config.headers) {
				config.headers["Authorization"] = `Bearer ${response.token}`;
			}
			return config;
		});
	
		return response;
	}
)

export const signUp = createAsyncThunk(
	"user/signup",
	async (credential: SignAction) => {
		const response = await authService.signUp(credential);
		return response;
	}
);

export const signOut = createAsyncThunk("user/signout", async () => {
	await authService.signOut();
	Router.push("/auth/signin");
});

export const fetchSession = createAsyncThunk("user/fetchSession", async () => {
	const response = await authService.getSession();
	// set access token
	if (response) {
		httpClient.interceptors.request.use((config?: AxiosRequestConfig | any) => {
			if (config && config.headers && response.sub) {
				config.headers["Authorization"] = `Bearer ${response.accessToken}`;
			}
			return config;
		});
	}
	return response;
});

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchSession.fulfilled, (state, action) => {
			state.isAuthenticating = false;
			if (action.payload.accessToken && action.payload.sub) {
				state.isAuthenticated = true;
				state.accessToken = action.payload.accessToken;
				state.sub = action.payload.sub;
				state.role = action.payload.role;
			}

		});
		builder.addCase(fetchSession.rejected, (state, action) => {
			state.accessToken = "";
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.sub = "";
			// state.uid = "";
		})

		// builder.addCase(signUp.fulfilled, (state, action) => {
		// 	state.accessToken = "";
		// 	state.email = action.payload.email;
		// 	state.username = action.payload.name;
		// 	state.isAuthenticated = false;
		// });
		builder.addCase(signIn.fulfilled, (state, action) => {
			// state.accessToken = action.payload.token;
			// state.username = action.payload.username;
			// state.role = action.payload.role;
			state.isAuthenticated = true;
			state.isAuthenticating = false;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.accessToken = "";
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.sub = "";
			// state.uid = "";

		});

		builder.addCase(signOut.fulfilled, (state, action) => {
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.username = "";
			state.accessToken = "";
		});
	}
})

export const authSelector = (store: RootState) => store.auth;
export const isAuthenticatedSelector = (store: RootState): boolean =>
	store.auth.isAuthenticated;
export const isAuthenticatingSelector = (store: RootState): boolean =>
	store.auth.isAuthenticating;

export default authSlice.reducer;