import { NextApiRequest, NextApiResponse } from 'next';
import httpClient from '@/common/utils/httpClient.util';
import {
	HTTP_METHOD_POST,
	HTTP_METHOD_DELETE,
	HTTP_METHOD_PATCH,
	HTTP_METHOD_GET,
	ACCESS_TOKEN_KEY,
} from "@/constants/api.constant";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.action) {
		const requestAction = req.query['action'][0]
		// getAllByGroup
		if (req.method === HTTP_METHOD_GET && requestAction == "getAllByGroup") {
			return getAllCategoryByGroup(req, res);
		
		}
		else if (req.method === HTTP_METHOD_DELETE) {
			return deleteCategory(req, res);
		} else if (req.method === HTTP_METHOD_PATCH) {
			return updateCategory(req, res);
		}
		else {
			return res
				.status(405)
				.end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
		}
	}
}

async function getAllCategoryByGroup(req: NextApiRequest, res: NextApiResponse<any>) {
	const accessToken = req.cookies[ACCESS_TOKEN_KEY];
	if (!accessToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	console.log(req)
	if (req.query) {
		const { data } = await httpClient.get(`/categories/group`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});
		if (data) {
			return res.status(200).json(data);
		} else {
			return res.status(400).json(data);
		}
	} else {
		return res.status
	}
}

async function deleteCategory(req: NextApiRequest, res: NextApiResponse<any>) {
	try {

		const accessToken = req.cookies[ACCESS_TOKEN_KEY];
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		if (req.query) {
			const { data } = await httpClient.delete(`/buildings/delete/${req.query['id']}`, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});
			if (data) {
				return res.status(200).json(data);
			} else {
				return res.status(400).json(data);
			}
		} else {
			return res.status(400).json({ message: 'id required' });
		}

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function updateCategory(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		const accessToken = req.cookies[ACCESS_TOKEN_KEY];
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const updateBody = req.body
		// console.log(updateBody.file);
		console.log("============ service==============")
		console.log(updateBody)
		console.log("============ service==============")

		if (req.query) {
			const { data } = await httpClient.patch(`/buildings/update/${req.query['id']}`, updateBody, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});

			if (data) {
				return res.status(200).json(data);
			} else {
				return res.status(400).json(data);
			}
		} else {
			return res.status(400).json({ message: 'id required' });
		}

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

// async function createCategory(req: NextApiRequest, res: NextApiResponse<any>) {
//   try {
//     const accessToken = req.cookies[ACCESS_TOKEN_KEY];
//     if (!accessToken) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const createBody = req.body;
//     if (createBody) {
//       const { data } = await httpClient.post(`/buildings/create`, createBody, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });

//       if(data){
//         return res.status(200).json(data);
//       }else{
//         return res.status(400).json(data);
//       }
//     } else {
//       return res.status(400).json({ message: 'create building is failed' });
//     }

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }