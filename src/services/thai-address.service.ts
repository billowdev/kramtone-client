import { GroupDataPayload, GroupDataArrayPayload, GroupDataArrayResponse, GroupDataResponse } from "@/models/group-data.model";
import httpClient from "@/common/utils/httpClient.util";
import axios from 'axios'
import {
	GeographyResponseType, GeographyType,
	ProvinceResponseType, ProvinceType,
	DistrictResponseType, DistrictType,
	SubdistrictResponseType, SubdistrictType,
} from "@/models/thai-address.model";

export const getGrographies = async (): Promise<GeographyType> => {
	const { data: response } = await axios.get<GeographyResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/geographies.json`)
	const { payload } = response
	return payload
};

export const getProvinceByGrography = async (geographyId: string): Promise<ProvinceType[]> => {
	const { data: response } = await axios.get<ProvinceResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/provinces.json`)
	const {payload} = response
	const filteredPayload = payload.filter((item: ProvinceType) => item.geographyId === parseInt(geographyId));
	return filteredPayload
};

export const getProvinceById = async (provinceId: string): Promise<ProvinceType[]> => {
	const { data: response } = await axios.get<ProvinceResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/districts.json`)
	const {payload} = response
	const filteredPayload = payload.filter((item: ProvinceType) => item.provinceId === parseInt(provinceId));
	return filteredPayload
};

export const getProvinces = async (): Promise<ProvinceType[]> => {
	const { data: response } = await axios.get<ProvinceResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/provinces.json`)
	const {payload} = response
	return payload
};

export const getDistricts = async (provinceId: string): Promise<DistrictType[]> => {
	const { data: response } = await axios.get<DistrictResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/districts.json`)
	const {payload} = response
	const filteredPayload = payload.filter((item: DistrictType) => item.provinceId === parseInt(provinceId));
	return filteredPayload
};
export const getDistrictById = async (districtId: string): Promise<DistrictType[]> => {
	const { data: response } = await axios.get<DistrictResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/districts.json`)
	const {payload} = response
	const filteredPayload = payload.filter((item: DistrictType) => item.id === parseInt(districtId));
	return filteredPayload
};


export const getSubdistricts = async (districtId: string): Promise<SubdistrictType[]> => {
	const { data: response } = await axios.get<SubdistrictResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/subdistricts.json`)
	const {payload} = response
	const filteredPayload = payload.filter((item: SubdistrictType) => item.districtId === parseInt(districtId));
	return filteredPayload
};

export const getSubdistrictsByZipCode = async (zipcode: string): Promise<SubdistrictType[]> => {
	const { data: response } = await axios.get<SubdistrictResponseType>(`${process.env.NEXT_PUBLIC_THAI_ADDRESS_API}/subdistricts.json`)
	const {payload} = response
	const filteredPayload = payload.filter((item: SubdistrictType) => item.zipCode === parseInt(zipcode));
	return filteredPayload
};

