import { ProductPayload, ProductArrayPayload, ProductArrayResponse, ProductResponse } from "@/models/product.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'
import { CategoryArrayResponse, CategoryResponse, CategoryPayload } from "@/models/category.model";

export const getOneCategory = async (id: string): Promise<CategoryResponse> => {
	const { data: response } = await httpClient.get(`/categories/get/${id}`);
	return response.payload
};

export const getAllCategoryByGroupId = async (id: string): Promise<CategoryArrayResponse> => {
	const { data: response } = await httpClient.get(`/categories/group/${id}`)
	return response.payload;
};

export const getAllCategoryByGroup = async (accessToken:string): Promise<CategoryPayload[]> => {
	const {data:response} = await axios.get(`/categories/group`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
	return response.payload;
};

export const getAllCategory = async (): Promise<CategoryPayload[]> => {
	const { data: response } = await httpClient.get(`/categories`)
	return response.payload;
};


export const createCategory = async ( data: FormData, accessToken: string): Promise<void> => {
	const response = await axios.post(`/categories`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};


export const updateCategory = async (id: string, data: FormData, accessToken: string): Promise<void> => {
	const {data:response} = await axios.patch(`/categories/${id}`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});

	
};

export const deleteCategory = async (id: string, accessToken: string): Promise<void> => {
	await httpClient.delete(`/categories/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

