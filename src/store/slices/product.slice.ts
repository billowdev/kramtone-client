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



// export const getAllGroupDataAction = createAsyncThunk("PRODUCT/GET_ALL", async (): Promise<any> => {
// 	const response = await productService.getAllGroupData()
// 	// console.log("===========slice===========")
// 	// console.log(response)
// 	return response;
// });

export const getAllProductByGroupAction = createAsyncThunk("PRODUCT_ACTION/GROUP_GET_ALL", async (id: string): Promise<any> => {
	const response = await productService.getAllProductByGroup(id)
	return response;
});


export const getOneProductAction = createAsyncThunk("PRODUCT_ACTION/GET_ONE", async (id: string): Promise<any> => {
	const response = await productService.getOneProduct(id)
	return response;
});


export const deleteProductAction = createAsyncThunk(
	"PRODUCT_ACTION/DELETE",
	async (data:{id: string, gid:string}) => {
	  await productService.deleteProduct(data.id!);
	  store.dispatch(getOneProductAction(data.gid!));
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