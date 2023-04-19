import { ProductPayload, ProductArrayPayload, ProductArrayResponse, ProductResponse } from "@/models/product.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'

export const getOneProduct = async (id: string): Promise<ProductResponse> => {
	const { data: response } = await httpClient.get(`/products/get/${id}`);
	return response.payload
};

export const getAllProductByGroup = async (id: string): Promise<ProductArrayResponse> => {
	const { data: response } = await httpClient.get(`/products/group/${id}`)
	return response.payload;
};

export const getAllProduct = async (): Promise<ProductArrayResponse> => {
	const { data: response } = await httpClient.get(`/products/get`)
	return response.payload;
};


export const createProduct = async (data: FormData, accessToken: string): Promise<any> => {
			console.log('Form Data:');
		for (const [key, value] of data.entries()) {
			console.log(key, value);
		}
		console.log("===============")
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
	const {data:response} = await axios.patch(`/product/${id}`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
	console.log(response)

};

export const deleteProduct = async (id: string): Promise<void> => {
	await httpClient.delete(`/product/${id}`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
};

