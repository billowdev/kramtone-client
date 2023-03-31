import { GroupDataPayload, GroupDataArrayPayload, GroupDataArrayResponse, GroupDataResponse } from "@/models/group-data.model";
import httpClient from "@/utils/httpClient.util";
import axios from 'axios'

export const getOneGroupData = async (id: string): Promise<GroupDataResponse> => {
	const { data: response } = await httpClient.get(`/groups/get/${id}`);
	return response.payload
};

export const getAllGroupData = async (): Promise<GroupDataArrayResponse> => {
	const { data: response } = await httpClient.get(`/groups/get`)
	return response.payload;
};


export const createGroupData = async (data: FormData, accessToken: string): Promise<any> => {
	await axios.post(`/groups/create`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
	});
};

export const updateGroupData = async (id: string, data: FormData, accessToken: string): Promise<void> => {
	await axios.patch(`/groups/update/${id}`, data, {
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

