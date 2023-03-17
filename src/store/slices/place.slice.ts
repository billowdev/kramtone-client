import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

import axios from 'axios'

const initialState: any = {
	// message: "",
	places: [],
};



export const fetchPlace = createAsyncThunk("groupdata/fetchPlace", async () => {
	const { data: response } = await axios.get(`https://raw.githubusercontent.com/billowdev/test-json/main/place.json`)
	// console.log('====================================');
	// console.log(response);
	// console.log('====================================');

	return response.payload;
});

export const placeSlice = createSlice({
	name: "place",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchPlace.fulfilled, (state, action) => {
			state.places = action.payload
		});

		builder.addCase(fetchPlace.rejected, (state, action) => {
			state.places = [];
			
		})




	}
})

export const placeSelector = (store: RootState) => store.place;

export default placeSlice.reducer;