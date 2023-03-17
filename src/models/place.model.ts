export interface PlaceModel {
	message: string
	payload: PlacePayload[]
}

export interface PlacePayload {
	name: string
	address: string
	lat: number
	lng: number
}
