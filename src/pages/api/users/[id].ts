// pages/api/user/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import httpClient from '@/common/utils/httpClient.util';
import { ACCESS_TOKEN_KEY } from '@/constants/api.constant';

export default async function getUserById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
      method,
    } = req;

    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies[ACCESS_TOKEN_KEY];

	console.log("============")
	console.log(token)
	console.log("============")
	
    const { data: response } = await httpClient.get(`/users/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json(response.payload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
