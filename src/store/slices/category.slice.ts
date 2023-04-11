import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryPayload, CategoryArrayPayload, CategoryArrayResponse } from "@/models/category.model";
import axios from 'axios'
import * as  categoryService from '@/services/category.service';
import { RootState, store } from "@/store/store";

interface CategoryState {
	category: Partial<CategoryPayload>,
	categoryArray: CategoryArrayPayload
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

export const getAllCategoryByGroupIdAction = createAsyncThunk("CATEGORY_ACTION/GROUP_GET_ALL_BY_GROUP_ID", async (id: string): Promise<any> => {
	const response = await categoryService.getAllCategoryByGroupId(id)
	return response;
});

export const getAllCategoryByGroupAction = createAsyncThunk("CATEGORY_ACTION/GROUP_GET_ALL_BY_GROUP", async (id: string): Promise<any> => {
	const response = await categoryService.getAllCategoryByGroup()
	return response;
});


export const getOneCategoryAction = createAsyncThunk("CATEGORY_ACTION/GET_ONE", async (id: string): Promise<any> => {
	const response = await categoryService.getOneCategory(id)
	return response;
});


export const deleteCategoryAction = createAsyncThunk(
	"CATEGORY_ACTION/DELETE",
	async (data:{id: string, gid:string}) => {
	  await categoryService.deleteCategory(data.id!);
	  store.dispatch(getOneCategoryAction(data.gid!));
	}
  );

export const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getAllCategoryByGroupAction.fulfilled, (state, action) => {
			state.categoryArray = action.payload
		});

		builder.addCase(getAllCategoryByGroupAction.rejected, (state, action) => {
			state.categoryArray = [];

		})

		builder.addCase(getAllCategoryByGroupIdAction.fulfilled, (state, action) => {
			state.categoryArray = action.payload
		});

		builder.addCase(getAllCategoryByGroupIdAction.rejected, (state, action) => {
			state.categoryArray = [];

		})

		builder.addCase(getOneCategoryAction.fulfilled, (state, action) => {
			state.category = action.payload
		});



	}
})

export const productSelector = (store: RootState) => store.product;

export default productSlice.reducer;