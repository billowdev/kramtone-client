import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryPayload, CategoryArrayPayload, CategoryArrayResponse } from "@/models/category.model";
import axios from 'axios'
import * as  categoryService from '@/services/category.service';
import { RootState, store } from "@/store/store";
import httpClient from "@/common/utils/httpClient.util";

interface CategoryState {
	category: Partial<CategoryPayload>,
	categoryArray: CategoryArrayPayload,
	
}
const initialState: CategoryState = {
	// message: "",
	category: {
		id: "",
		name: "",
		desc: "",
		image: "",
		isDefault: true,
		createdAt: "",
		updatedAt: "",
	},
	categoryArray: [],

};

export const getAllCategory = createAsyncThunk("CATEGORY/GET_ALL", async (): Promise<any> => {
	const response = await categoryService.getAllCategory()
	return response;
});

export const getAllCategoryByGroupAction = createAsyncThunk("CATEGORY/GROUP_GET_ALL_BY_GROUP", async (): Promise<any> => {
	const {data:response} = await httpClient.get(`/categories/getAllByGroup`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.payload;
});

export const getOneCategoryAction = createAsyncThunk("CATEGORY/GET_ONE", async (id: string): Promise<any> => {
	const response = await categoryService.getOneCategory(id)
	return response;
});


export const deleteCategoryAction = createAsyncThunk(
	"CATEGORY/DELETE",
	async (data: { id: string }) => {
		const { data: response } = await httpClient.delete(`/categories/${data.id}`, {
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		});
		return response.payload;
		// store.dispatch(getOneCategoryAction(data.gid!));
	}
);

export const updateCategoryAction = createAsyncThunk(
	"CATEGORY/UPDATE",
	async (data:any) => {
		// console.log(data)
		await categoryService.updateCategory(data.id!, data.body, data.accessToken!);
		store.dispatch(getAllCategoryByGroupAction());
	}
);

export const createCategoryAction = createAsyncThunk(
	"CATEGORY/CREATE",
	async (data:any) => {
		await categoryService.createCategory(data.body, data.accessToken);
		// store.dispatch(getAllCategoryByGroupAction());
	}
);

export const categorySlice = createSlice({
	name: "category",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getAllCategory.fulfilled, (state, action) => {
			state.categoryArray = action.payload
		});

		builder.addCase(getAllCategory.rejected, (state, action) => {
			state.categoryArray = [];
		})

		builder.addCase(getOneCategoryAction.fulfilled, (state, action) => {
			state.category = action.payload
		});


		// builder.addCase(createCategoryAction.rejected, (state, action) => {
		// 	state.error = action.payload
		// })

		// builder.addCase(createCategoryAction.fulfilled, (state, action) => {
		// 	state.category = action.payload
		// });

	}
})

export const categorySelector = (store: RootState) => store.category;

export default categorySlice.reducer;