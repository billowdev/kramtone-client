import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import * as  colorSchemeService from '@/services/color-scheme.service';
import { RootState, store } from "@/store/store";
import httpClient from "@/common/utils/httpClient.util";
import { ColorSchemeArrayPayload, ColorSchemePayload } from "@/models/color-scheme.model";

interface ColorSchemeState {
	colorScheme: Partial<ColorSchemePayload>,
	colorSchemeArray: ColorSchemeArrayPayload,

}
const initialState: ColorSchemeState = {
	// message: "",
	colorScheme: {
		id: "",
		nameEN: "",
		nameTH: "",
		hex: "",
	},
	colorSchemeArray: [],

};

export const getAllColorSchemeByGroupIdAction = createAsyncThunk("COLOR_SCHEME/GROUP_GET_ALL_BY_GROUP_ID", async (id: string): Promise<any> => {
	const response = await colorSchemeService.getAllColorSchemeByGroupId(id)
	return response;
});

export const getAllColorSchemeByGroupAction = createAsyncThunk("COLOR_SCHEME/GROUP_GET_ALL_BY_GROUP", async (): Promise<any> => {
	const { data: response } = await httpClient.get(`/categories/getAllByGroup`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.payload;
});

export const getAllColorScheme = createAsyncThunk("COLOR_SCHEME/GET_ALL", async (): Promise<any> => {
	const { data: response } = await httpClient.get(`/color-schemes/getAll`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.payload;
});

export const getOneColorSchemeAction = createAsyncThunk("COLOR_SCHEME/GET_ONE", async (id: string): Promise<any> => {
	const response = await colorSchemeService.getOneColorScheme(id)
	return response;
});


export const deleteColorSchemeAction = createAsyncThunk(
	"COLOR_SCHEME/DELETE",
	async (data: { id: string, gid: string, accessToken: string }) => {
		await colorSchemeService.deleteColorScheme(data.id!, data.accessToken!);
		store.dispatch(getOneColorSchemeAction(data.gid!));
	}
);

export const updateColorSchemeAction = createAsyncThunk(
	"COLOR_SCHEME/UPDATE",
	async (data: any) => {
		// console.log(data)
		await colorSchemeService.updateColorScheme(data.id!, data.body, data.accessToken!);
		store.dispatch(getAllColorSchemeByGroupAction());
	}
);

export const createColorSchemeAction = createAsyncThunk(
	"COLOR_SCHEME/CREATE",
	async (data: any) => {
		await colorSchemeService.createColorScheme(data.body, data.accessToken);
		// store.dispatch(getAllColorSchemeByGroupAction());
	}
);

export const colorSchemeSlice = createSlice({
	name: "colorScheme",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getAllColorSchemeByGroupAction.fulfilled, (state, action) => {
			state.colorSchemeArray = action.payload
		});

		builder.addCase(getAllColorSchemeByGroupAction.rejected, (state, action) => {
			state.colorSchemeArray = [];
		})
		
		builder.addCase(getAllColorScheme.fulfilled, (state, action) => {
			state.colorSchemeArray = action.payload
		});

		builder.addCase(getAllColorScheme.rejected, (state, action) => {
			state.colorSchemeArray = [];
		})
		builder.addCase(getAllColorSchemeByGroupIdAction.fulfilled, (state, action) => {
			state.colorSchemeArray = action.payload
		});

		builder.addCase(getAllColorSchemeByGroupIdAction.rejected, (state, action) => {
			state.colorSchemeArray = [];

		})

		builder.addCase(getOneColorSchemeAction.fulfilled, (state, action) => {
			state.colorScheme = action.payload
		});


		// builder.addCase(createColorSchemeAction.rejected, (state, action) => {
		// 	state.error = action.payload
		// })

		// builder.addCase(createColorSchemeAction.fulfilled, (state, action) => {
		// 	state.category = action.payload
		// });

	}
})

export const colorSchemeSelector = (store: RootState) => store.colorScheme;

export default colorSchemeSlice.reducer;