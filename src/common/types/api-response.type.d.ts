export type ErrorType = {
	code: number;
	message: string;
}

export type ApiResponseType<T> = {
	status: string;
	payload: T;
	error: ErrorType | null;
}