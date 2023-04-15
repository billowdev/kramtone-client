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
	image: string
	isDefault?: boolean
	createdAt?: string
	updatedAt?: string
}
