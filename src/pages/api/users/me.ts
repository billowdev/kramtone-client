import { NextApiRequest, NextApiResponse } from 'next'
import cookie from "cookie";
import httpClient from '@/common/utils/httpClient.util';
import { ACCESS_TOKEN_KEY } from '@/constants/api.constant';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
	const cookies = cookie.parse(req.headers.cookie || "");
	const token = cookies[ACCESS_TOKEN_KEY];
	const { data: response } = await httpClient.get(`/users/me`, {
		headers: { Authorization: `Bearer ${token}` },
	});
 
    res.status(200).json(response)
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: 'Something went wrong.' })
  }
}
