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

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies[ACCESS_TOKEN_KEY];

    if (method === 'GET') {
      const { data: response } = await httpClient.get(`/users/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.status(200).json(response.payload);
    } else if (method === 'DELETE') {
      await httpClient.delete(`/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
