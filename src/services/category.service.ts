import { ProductPayload, ProductArrayPayload, ProductArrayResponse, ProductResponse } from "@/models/product.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'
import { CategoryArrayResponse, CategoryResponse } from "@/models/category.model";

export const getOneCategory = async (id: string): Promise<CategoryResponse> => {
	const { data: response } = await httpClient.get(`/categories/get/${id}`);
	return response.payload
};

export const getAllCategoryByGroupId = async (id: string): Promise<CategoryArrayResponse> => {
	const { data: response } = await httpClient.get(`/categories/group/${id}`)
	return response.payload;
};

export const getAllCategoryByGroup= async (): Promise<CategoryArrayResponse> => {
	const { data: response } = await httpClient.get(`/categories/group`)
	return response.payload;
};

export const getAllCategory = async (): Promise<CategoryArrayResponse> => {
	const { data: response } = await httpClient.get(`/categories`)
	return response.payload;
};


export const createCategory = async (data: FormData, accessToken: string): Promise<any> => {
	await axios.post(`/groups`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

export const updateCategory = async (id: string, data: FormData, accessToken: string): Promise<void> => {
	// console.log('Form Data:');
	// for (const [key, value] of data.entries()) {
	// 	console.log(key, value);
	// }
	const {data:response} = await axios.patch(`/categories/${id}`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
	console.log(response)

};

export const deleteCategory = async (id: string): Promise<void> => {
	await httpClient.delete(`/categoriess/${id}`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
};

