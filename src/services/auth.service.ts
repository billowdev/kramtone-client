import { AuthResponseType, IAuthPayload, SessionResponseType, SignUp } from "@/models/auth.model"
import httpClient from "@/common/utils/httpClient.util";
import axios from "axios";
import { ApiResponseType } from "common/types/api-response.type";

type signProps = {
	username: string;
	password: string;
};

// next local api
export const signIn = async (user: signProps) => {
	const { data: response } = await httpClient.post(
		`/auth/signin`,
		user,
		{
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		}
	);
	return response;
};

// next local api
export async function signOut() {
	const { data: response } = await httpClient.get(`/auth/signout`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response;
}

// server api
export const signUp = async (user: signProps): Promise<SignUp> => {
	const { data: response } = await httpClient.post<SignUp>("/users/signup", user);
	return response;
};


// next local api
export const getSession = async (): Promise<SessionResponseType> => {
	const { data: response } = await httpClient.get(`/auth/session`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	})
	const { session, accessToken } = response

	return { ...session, accessToken }
};


export const getProfile = async (token: string): Promise<any> => {
	const { data: response } = await axios.get(`/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
	})

	return response.payload
};

export const updateUserById = async (id: string, accessToken: string, body: any): Promise<any> => {
	const { data: response } = await axios.patch(`/users/${id}`, body, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
	})

	return response.payload
};

export const getSessionServerSide = async (token: string): Promise<any> => {
	const { data: response } = await axios.get(`/users/session`, {
		headers: {
			Authorization: `Bearer ${token}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
	})

	return response.payload
};