import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import * as  colorSchemeService from '@/services/color-scheme.service';
import { RootState, store } from "@/store/store";
import httpClient from "@/common/utils/httpClient.util";
import { ColorSchemeArrayPayload, ColorSchemePayload,GroupColorSchemePayload } from "@/models/color-scheme.model";

interface ColorSchemeState {
	colorScheme: Partial<ColorSchemePayload>,
	colorSchemeArray: ColorSchemeArrayPayload,
	groupColorSchemes: GroupColorSchemePayload[]

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
	groupColorSchemes: [],
};

export const getAllColorSchemeByGroupIdAction = createAsyncThunk("COLOR_SCHEME/GROUP_GET_ALL_BY_GROUP_ID", async (id: string): Promise<any> => {
	const response = await colorSchemeService.getAllColorSchemeByGroupId(id)
	return response;
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


export const deleteColorScheme = createAsyncThunk(
	"COLOR_SCHEME/DELETE",
	async (data: { id: string}) => {
		const { data: response } = await httpClient.delete(`/color-schemes/${data.id}`, {
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		});
		return response.payload;
		// store.dispatch(getAllColorScheme());
	}
);


// export const updateColorScheme = createAsyncThunk(
// 	"COLOR_SCHEME/UPDATE",
// 	async (data: any) => {
// 		const { data: response } = await httpClient.delete(`/color-schemes/${data.updateValue.id}`, {
// 			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
// 		});
// 		return response.payload;
// 		// store.dispatch(getOneCategoryAction(data.gid!));
// 	}
// );

export const updateColorScheme = createAsyncThunk(
	"COLOR_SCHEME/UPDATE",
	async (data: any) => {
		const { data: response } = await httpClient.patch(`/color-schemes/${data.colorSchemeId}`, data.updateValue,{
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
			headers: {
				'Authorization': `Bearer ${data.accessToken}`,
			},
		});
		// console.log("========= slice =================")
		// console.log(response)
		return response.payload
	}
);

export const createColorScheme = createAsyncThunk(
	"COLOR_SCHEME/CREATE",
	async (data: any) => {
		const { data: response } = await httpClient.post(`/color-schemes/create`, data, {
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		});
	}
);



export const deleteGroupColorScheme = createAsyncThunk(
	"COLOR_SCHEME/GROUOP_DELETE",
	async (groupColorSchemeId:string) => {
		const { data: response } = await httpClient.delete(`/color-schemes/deleteGroupColorScheme?id=${groupColorSchemeId}`, {
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		});
		return response.payload;
		// store.dispatch(getAllColorScheme());
	}
);

export const getAllGroupColorScheme = createAsyncThunk("COLOR_SCHEME/GET_ALL_GROUP", async (gid:string): Promise<any> => {
	const { data: response } = await httpClient.get(`/color-schemes/getAllGroupColorScheme?id=${gid}`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.payload;
});

export const createGroupColorScheme = createAsyncThunk("COLOR_SCHEME/CREATE", async (colorSchemeId:string): Promise<any> => {
	const { data: response } = await httpClient.post(`/color-schemes/createGroupColorScheme`, {colorSchemeId}, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.payload;
});

export const colorSchemeSlice = createSlice({
	name: "colorScheme",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		// builder.addCase(getAllColorSchemeByGroupAction.fulfilled, (state, action) => {
		// 	state.colorSchemeArray = action.payload
		// });

		// builder.addCase(getAllColorSchemeByGroupAction.rejected, (state, action) => {
		// 	state.colorSchemeArray = [];
		// })
		
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
		
		builder.addCase(getAllGroupColorScheme.fulfilled, (state, action) => {
			state.groupColorSchemes = action.payload
		});

		builder.addCase(getAllGroupColorScheme.rejected, (state, action) => {
			state.groupColorSchemes = [];

		})
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