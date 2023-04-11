import {ApiResponseType} from "@/common/types/api-response.type"

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
	geographyId: number;
}

export type ProvinceResponseType = ApiResponseType<Array<ProvinceType>>

export interface DistrictType {
	id: number;
	code: number;
	nameTH: string;
	nameEN: string;
	provinceId: number;
}

export type DistrictResponseType = ApiResponseType<Array<DistrictType>>

export interface SubdistrictType {
	id: number;
	zipCode: number;
	nameTH: string;
	nameEN: string;
	districtId: number;
}

export type SubdistrictResponseType = ApiResponseType<Array<SubdistrictType>>




