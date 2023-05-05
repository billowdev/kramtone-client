import { NextApiRequest, NextApiResponse } from 'next';
import httpClient from '@/common/utils/httpClient.util';
import {
	HTTP_METHOD_POST,
	HTTP_METHOD_DELETE,
	HTTP_METHOD_PATCH,
	HTTP_METHOD_GET,
	ACCESS_TOKEN_KEY,
} from "@/constants/api.constant";
import * as authService from "@/services/auth.service"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.action) {
		const requestAction = req.query.action[0]
	
		if (req.method === HTTP_METHOD_GET && requestAction == "getAll") {
			return getAll(req, res);
		}
		else if (req.method === HTTP_METHOD_GET && requestAction == "getOne") {
			return getOne(req, res);
		}
		
		else if (req.method === HTTP_METHOD_GET && requestAction == "getAllGroupColorScheme") {
			return getAllGroupColorScheme(req, res);
		}
		else if (req.method === HTTP_METHOD_POST && requestAction == "createGroupColorScheme") {
			return createGroupColorScheme(req, res);
		}
		else if (req.method === HTTP_METHOD_DELETE && requestAction == "deleteGroupColorScheme") {
			return deleteGroupColorScheme(req, res);
		}
		else if (req.method === HTTP_METHOD_DELETE) {
			return deleteColorScheme(req, res);
		} else if (req.method === HTTP_METHOD_PATCH) {
			return updateColorScheme(req, res);
		}
		else if (req.method === HTTP_METHOD_POST && requestAction == "create") {

			return createColorScheme(req, res);
		}
		else {
			return res
				.status(405)
				.end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
		}
	}
}

async function getOne(req: NextApiRequest, res: NextApiResponse<any>) {
	const accessToken = req.cookies[ACCESS_TOKEN_KEY];
	if (!accessToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (req.query) {
		const { data } = await httpClient.get(`/colorschemes/${req.query[0]}`, {
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


async function getAllGroupColorScheme(req: NextApiRequest, res: NextApiResponse<any>) {
	const accessToken = req.cookies[ACCESS_TOKEN_KEY];
	if (!accessToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (req.query) {
		const { data:response } = await httpClient.get(`/colorschemes/group/${req.query.id}`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});
		if (response) {
		
			return res.status(200).json(response);
		} else {
			return res.status(400).json(response);
		}
	} else {
		return res.status
	}
}

async function getAll(req: NextApiRequest, res: NextApiResponse<any>) {
	const accessToken = req.cookies[ACCESS_TOKEN_KEY];
	if (!accessToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (req.query) {
		const { data } = await httpClient.get(`/colorschemes`, {
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

async function deleteColorScheme(req: NextApiRequest, res: NextApiResponse<any>) {
	try {

		const accessToken = req.cookies[ACCESS_TOKEN_KEY];
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		if (req.query) {
			// console.log("=================")
			// console.log(req.query['action'])
			// console.log("=================")
			const { data: response } = await httpClient.delete(`/colorschemes/${req.query['action']}`, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.status(400).json(response);
			}
		} else {
			return res.status(400).json({ message: 'id required' });
		}

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function updateColorScheme(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		const accessToken = req.cookies[ACCESS_TOKEN_KEY];
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const updateBody = req.body

		if (req.query) {
			const { data } = await httpClient.patch(`/colorschemes/${req.query['id']}`, updateBody, {
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
		// console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function createColorScheme(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		const accessToken = req.cookies[ACCESS_TOKEN_KEY];
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const createBody = req.body;

		if (createBody) {
			const { data: response } = await httpClient.post(`/colorschemes`, createBody, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});

			if (response) {
				return res.status(200).json(response);
			} else {
				return res.status(400).json(response);
			}
		} else {
			return res.status(400).json({ message: 'create color scheme is failed' });
		}

	} catch (error) {
		// console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function createGroupColorScheme(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		const accessToken = req.cookies[ACCESS_TOKEN_KEY];

		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const { gid } = await authService.getSessionServerSide(accessToken)


		const createBody = {...req.body, groupId:gid};
		// console.log("===============")
		// console.log(createBody)
		// console.log("===============")
		if (createBody) {
			const { data: response } = await httpClient.post(`/colorschemes/group`, createBody, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});

			if (response) {
				return res.status(200).json(response);
			} else if (response.status === 409) {
				// console.log("===================")
				// console.log("conflic")
				// console.log("===================")
				return res.status(409).json(response);
			}
			else {
				return res.status(400).json(response);
			}
		} else {
			return res.status(400).json({ message: 'create color scheme is failed' });
		}

	} catch (error) {
		// console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}


async function deleteGroupColorScheme(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		const accessToken = req.cookies[ACCESS_TOKEN_KEY];
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		if (req.query) {
			const { data: response } = await httpClient.delete(`/colorschemes/group/delete/${req.query.id}`, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.status(400).json(response);
			}
		} else {
			return res.status(400).json({ message: 'id required' });
		}

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}




