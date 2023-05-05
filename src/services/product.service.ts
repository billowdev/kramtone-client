import { ProductPayload, ProductArrayPayload, ProductArrayResponse, ProductResponse } from "@/models/product.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'

export const getOneProduct = async (id: any): Promise<ProductResponse> => {
	const { data: response } = await httpClient.get(`/products/${id}`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
	return response.payload
};


export const getAllProductByGroupForManage = async (id: string): Promise<ProductArrayResponse> => {
	const { data: response } = await httpClient.get(`/products/group/manage/${id}`)
	return response.payload;
};

export const getAllProductByGroup = async (id: string): Promise<ProductArrayResponse> => {
	const { data: response } = await httpClient.get(`/products/group/${id}`)
	return response.payload;
};

export const getAllProduct = async (): Promise<ProductArrayResponse> => {
	const { data: response } = await httpClient.get(`/products`)
	return response.payload;
};

export const increaseReloadCount = async (id:string): Promise<any> => {
	const { data: response } = await httpClient.get('/products/view/'+id)
	return response.payload
}

export const createProduct = async (data: FormData, accessToken: string): Promise<any> => {
	await axios.post(`/products`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

export const updateProduct = async (id: string, data: FormData, accessToken: string): Promise<void> => {
	// console.log('Form Data:');
	// for (const [key, value] of data.entries()) {
	// 	console.log(key, value);
	// }
	const { data: response } = await axios.patch(`/products/${id}/data`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

export const deleteProduct = async (id: string, accessToken: string): Promise<void> => {
	await httpClient.delete(`/products/delete-product/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
	});
};

export const deleteProductImage = async (productId: string, imageId: string, accessToken: string): Promise<void> => {
	await httpClient.delete(`/products/${productId}/images/${imageId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
	});
};




