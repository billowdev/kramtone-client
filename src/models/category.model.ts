import { GroupDataPayload } from "./group-data.model"

export interface CategoryResponse {
	status: string
	payload: CategoryPayload
	error: any
}

export interface CategoryArrayResponse {
	status: string
	payload: CategoryArrayPayload
	error: any
}

export type CategoryArrayPayload = CategoryPayload[]


export interface CategoryPayload {
	id: string
	name: string
	desc: string
	isDefault?: boolean
	createdAt?: string
	updatedAt?: string
	image_file? : any | Blob
	image_obj? : URL | string;
	image? : URL | string;
}
