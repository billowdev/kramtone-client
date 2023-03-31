export interface GroupDataResponse {
	status: string
	payload: GroupDataPayload
	error: any
  }

  export interface GroupDataArrayResponse {
	status: string
	payload: GroupDataArrayPayload
	error: any
  }

  export type GroupDataArrayPayload = GroupDataPayload[]
  
  export interface GroupDataPayload {
	id?: string
	groupName: string
	groupType: string
	agency: string
	logo: string
	banner: string
	phone: string
	email: string
	hno: string
	village: string
	lane: string
	road: string
	subdistrict: string
	district: string
	province: string
	zipCode: string
	lat: string
	lng: string
	createdAt?: string
	updatedAt?: string
  }
  