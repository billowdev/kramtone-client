import { ProductPayload, ProductArrayPayload, ProductArrayResponse, ProductResponse } from "@/models/product.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'
import { ColorSchemeArrayResponse, ColorSchemeResponse, ColorSchemePayload} from "@/models/color-scheme.model";
import * as colorSchemeService from "@/services/color-scheme.service"

export const getOneColorScheme = async (id: string): Promise<ColorSchemeResponse> => {
	const { data: response } = await httpClient.get(`/colorschemes/get/${id}`);
	return response.payload
};

export const getAllColorSchemeByGroupId = async (id: string): Promise<ColorSchemeArrayResponse> => {
	const { data: response } = await httpClient.get(`/colorschemes/group/${id}`)
	return response.payload;
};

export const getAllColorSchemeByGroup = async (accessToken:string): Promise<ColorSchemeArrayResponse> => {
	const {data:response} = await axios.get(`/colorschemes/group`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
	return response.payload;
};

export const getAllColorScheme = async (): Promise<ColorSchemePayload[]> => {
	const { data: response } = await httpClient.get(`/colorschemes`)
	return response.payload;
};


export const createColorScheme = async ( data: FormData, accessToken: string): Promise<void> => {
	const response = await axios.post(`/colorschemes`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
	// const {data:response} = await axios.post(`/colorschemes/${id}`, data, {
	// 	headers: {
	// 		Authorization: `Bearer ${accessToken}`
	// 	},
	// 	baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	// });
	console.log(response)
};


export const updateColorScheme = async (id: string, data: FormData, accessToken: string): Promise<void> => {
	// console.log('Form Data:');
	// for (const [key, value] of data.entries()) {
	// 	console.log(key, value);
	// }
	// console.log("===============")
	// console.log(id, accessToken)
	const {data:response} = await axios.patch(`/colorschemes/${id}`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});

	
};

export const deleteColorScheme = async (id: string, accessToken: string): Promise<void> => {
	await httpClient.delete(`/colorschemes/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

