import { CategoryPayload } from "./category.model"
import { GroupDataPayload } from "./group-data.model"

export interface ProductResponse {
	status: string
	payload: ProductPayload
	error: any
  }

  export interface ProductArrayResponse {
	status: string
	payload: ProductArrayPayload
	error: any
  }

  export type ProductArrayPayload = ProductPayload[]
  

  export interface ProductPayload {
	id?: string
	name: string
	desc: string
	price: string
	createdAt?: string
	updatedAt?: string
	category?: CategoryPayload
	productImages?: ProductImage[]
	groupData?: GroupDataPayload
  }
  

  export interface ProductImage {
	id: string
	image: string
  }