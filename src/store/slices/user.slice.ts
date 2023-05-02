import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/common/utils/httpClient.util";
import {  UserPayload } from "@/models/auth.model";
import { RootState } from "@/store/store";

interface UserInitialState {
	user : UserPayload
	users : UserPayload[]
}
const initialState: UserInitialState = {
	user: {
	},
	users: []

};

export const getAllUser = createAsyncThunk(
	"USER/GET_ALL",
	async () => {
	const { data: response } = await httpClient.get(`/users/get_all_user`, {
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		})
	
		return response;
	}
)

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getAllUser.fulfilled, (state, action) => {
			state.users = action.payload
		});
		builder.addCase(getAllUser.rejected, (state, action) => {
			state.users = []

		})
	}
})

export const userSelector = (store: RootState) => store.user;

	

export default userSlice.reducer;