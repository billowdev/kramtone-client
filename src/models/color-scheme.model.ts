
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

