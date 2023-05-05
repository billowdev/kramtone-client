
export interface ColorSchemeResponse {
	status: string
	payload: ColorSchemePayload
	error: any
}

export interface ColorSchemeArrayResponse {
	status: string
	payload: ColorSchemeArrayPayload
	error: any
}

export type ColorSchemeArrayPayload = ColorSchemePayload[]


export interface ColorSchemePayload {
	id: string
	nameEN: string
	nameTH: string
	hex: string
}

export interface GroupColorSchemePayload {
	id: string
	groupId: string
	colorSchemeId: string
	createdAt: string
	updatedAt: string
	colorScheme: ColorSchemePayload
}

