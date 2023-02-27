import { ApiResponseType } from 'common/types/api-response.type';


export interface GeographyType {
	id: number;
	name: string;
}

export type GeographyResponseType = ApiResponseType<GeographyType>

export interface ProvinceType {
	id: number;
	code: string;
	nameTH: string;
	nameEN: string;
	GeographyId: number;
}

export type ProvinceResponseType = ApiResponseType<ProvinceType>

export interface DistrictType {
	id: number;
	code: number;
	nameTH: string;
	nameEN: string;
	ProvinceId: number;
}

export type DistrictResponseType = ApiResponseType<DistrictType>

export interface SubDistrictType {
	id: number;
	zipCode: number;
	nameTH: string;
	nameEN: string;
	DistrictId: number;
}

export type SubDistrictResponseType = ApiResponseType<SubDistrictType>







