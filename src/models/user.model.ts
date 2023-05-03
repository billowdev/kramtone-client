export interface UserArrayResponse {
	status: string
	payload: UserPayload[]
	error: any
  }
  
  export interface UserPayload {
	id: string
	username: string
	email?: string
	role: string
	name: string
	surname: string
	phone?: string
	activated: boolean
	removed: boolean
	groupId?: string
	createdAt: string
	updatedAt: string
  }
  