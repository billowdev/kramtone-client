import {
	HTTP_METHOD_POST,
	HTTP_METHOD_GET,
	ACCESS_TOKEN_KEY,
} from 'common/constants/api.constant'
import { clearCookie, setCookie } from "@/common/utils/cookies.util";
import httpClient from "@/common/utils/httpClient.util";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import * as jwt from 'jsonwebtoken';
import { decryptAES } from '@/common/utils/aes-encrypt.util';
import { API_REQUEST_SUCCESS } from 'common/constants/api.constant';
import { ISignIn } from 'models/auth.model';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.nextauth) {
		const signinAction: string = req.query['nextauth'][0]
		const sessionAction: string = req.query['nextauth'][0]
		const signOutAction: string = req.query['nextauth'][0]

		if (req.method === HTTP_METHOD_POST && signinAction === "signin") {
			return signin(req, res);
		} else if (req.method === HTTP_METHOD_GET && signOutAction === "signout") {
			return signout(req, res);
		} else if (req.method === HTTP_METHOD_GET && sessionAction === "session") {
			return getSessionLocalApi(req, res);
		} else {
			return res
				.status(405)
				.end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
		}
	}
}

async function signin(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		const { username, password } = req.body
		// const { data: response } = await httpClient.post(`/users/signin`, { username, password }, {});
		const response = await httpClient.post(`/users/signin`, { username, password })
		// const response = await axios.post(`/users/signin`, {username, password}, {
		// 	baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
		// });

		// const decryptData = decryptAES<ISignIn>(response.payload)
		// const { token } = decryptData;
		const { token } = response.data.payload

		// set the accessToken cookie

		setCookie(res, ACCESS_TOKEN_KEY, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			path: "/",
		});
		// res.status(200).json(decryptData);
		res.json(response.data)
	} catch (error: any) {
		res.status(400).end();
	}
}

function signout(req: NextApiRequest, res: NextApiResponse) {
	clearCookie(res, ACCESS_TOKEN_KEY);
	res.json({ result: "signout successfuly" });
}

const getSessionLocalApi = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const cookies = cookie.parse(req.headers.cookie || "");
		const token = cookies[ACCESS_TOKEN_KEY];

		if (token) {
			const { data: response } = await httpClient.get(`/users/session`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const accessToken = response.payload.refreshToken
			const session = jwt.decode(accessToken)
			res.status(200).json({ session, accessToken });
		} else {
			res.status(400).json({ success: false, msg: "something went wrong!" });
		}
	} catch (error: any) {
		res.status(400).json({ success: false, msg: "something went wrong!" });
	}
}
