import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductPayload, ProductArrayPayload, ProductArrayResponse } from "@/models/product.model";
import axios from 'axios'
import * as  productService from '@/services/product.service';
import { GroupDataResponse } from '../../models/group-data.model';
import { RootState, store } from "@/store/store";

interface ProductState {
	product: Partial<ProductPayload>,
	productArray: ProductArrayPayload
}
const initialState: ProductState = {
	// message: "",
	product: {
		id: "",
		name: "",
		desc: "",
		price: "",
		createdAt: "",
		updatedAt: "",
	},
	productArray: [],
};


export const getAllProductByGroupAction = createAsyncThunk("PRODUCT/GROUP_GET_ALL", async (id: string): Promise<any> => {
	const response = await productService.getAllProductByGroup(id)
	return response;
});


export const getOneProductAction = createAsyncThunk("PRODUCT/GET_ONE", async (id: string): Promise<any> => {
	const response = await productService.getOneProduct(id)
	return response;
});


export const deleteProductAction = createAsyncThunk(
	"PRODUCT/DELETE",
	async (data: { id?: string | undefined, gid?: string | undefined, accessToken?: string | undefined }) => {
		await productService.deleteProduct(data.id!, data.accessToken!);
		store.dispatch(getOneProductAction(data.gid!));
	}
);

export const deleteProductImageAction = createAsyncThunk(
	"PRODUCT/DELETE_IMAGE",
	async (data: { productId?: string, id?: string, accessToken?: string, gid?: string }) => {
		await productService.deleteProductImage(data.productId!, data.id!, data.accessToken!);
		const newPatchData = store.dispatch(getOneProductAction(data.gid!));
		return newPatchData
	}
);

export const createProductAction = createAsyncThunk(
	"PRODUCT/CREATE",
	async (data: any) => {
		await productService.createProduct(data.body, data.accessToken);

	}
);

export const updateProductAction = createAsyncThunk(
	"PRODUCT/UPDATE",
	async (data: any) => {
		await productService.updateProduct(data.id, data.body, data.accessToken);

	}
);


export const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getAllProductByGroupAction.fulfilled, (state, action) => {
			state.productArray = action.payload
		});

		builder.addCase(getAllProductByGroupAction.rejected, (state, action) => {
			state.productArray = [];

		})

		builder.addCase(getOneProductAction.fulfilled, (state, action) => {
			state.product = action.payload
		});

		builder.addCase(getOneProductAction.rejected, (state, action) => {
			state.product = {

			}

		})

	}
})

export const productSelector = (store: RootState) => store.product;

export default productSlice.reducer;