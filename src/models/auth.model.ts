import { ApiResponseType } from 'common/types/api-response.type';

export interface IAuth {
	id:string
	role:string
	username:string
}
export interface ISignIn {
	auth: IAuth
	token: string
}


export interface IAuthPayload {
	auth: IAuth
	token: string
}

export type AuthResponseType = ApiResponseType<IAuthPayload>

export interface SignUp {
	email: string
	password: string
	name: string
	surname: string
	phone: string
}


export type UserState = {
	sub: string;
	role: string;
	gid: string;
	groupName: string,
	groupType: string,
	activated: boolean;
	username: string;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	accessToken: string;
	error?: string;
}

export interface SignInAction {
	username: string;
	password: string;
}

export interface SignUpAction {
	username: string;
	password: string;
	name: string;
	surname: string;
}

export type SessionResponseType = {
	sub: string,
	groupName: string,
	gid: string,
	role: string,
	groupType: string,
	accessToken: string;
	activated: boolean;
	iat: string,
	exp: string,
}

export interface AuthModel {
	id: string
	email: string
	name: string
	surname: string
	phone: string
	accessToken: string
}

export interface UserResponse {
	status: string
	payload: UserPayload
	error: any
  }
  
  export interface UserPayload {
	id?: string
	username?: string
	email?: string
	role?: string
	name?: string
	surname?: string
	phone?: string
	activated?: boolean
	removed?: boolean
	groupId?: string
	createdAt?: string
	updatedAt?: string
  }
  