import { GroupDataPayload, GroupDataArrayPayload, GroupDataArrayResponse, GroupDataResponse } from "@/models/group-data.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'
export interface Filters {
	categoryId?: string | null;
	colorSchemeId?: string | null;
  }
  
export const getOneGroupData = async (id: string | undefined): Promise<GroupDataResponse> => {
	const { data: response } = await httpClient.get(`/groups/get/${id}`);
	return response.payload
};

export const getAllGroupData = async (
	filters: Filters = {}
  ): Promise<GroupDataArrayResponse> => {
	const { categoryId, colorSchemeId } = filters;
	let params = {};
  
	if (categoryId) {
	  params = { ...params, categoryId };
	}
  
	if (colorSchemeId) {
	  params = { ...params, colorSchemeId };
	}
  
	const { data: response } = await httpClient.get(`/groups/get`, { params });
	return response.payload;
  };
  

export const createGroupData = async (data: FormData, accessToken: string): Promise<any> => {
	await axios.post(`/groups`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

export const updateGroupData = async (id: string, data: FormData, accessToken: string): Promise<void> => {

	const {data:response} = await axios.patch(`/groups/${id}`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});

};

export const deleteGroupData = async (id: string): Promise<void> => {
	await httpClient.delete(`/groups/${id}`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
};

