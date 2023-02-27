// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpClient from "@/utils/httpClient.util";
import { GeographyResponseType, ProvinceResponseType } from './types/thai-address.type';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeographyResponseType>
) {
  console.log('====================================');
  console.log(req.query);
  console.log('====================================');
  // if (req.query) {
  // 	const action: string = req.query['nextauth'][1]
  // 	if (req.method === HTTP_METHOD_POST && action === "signin") {
  // 		return signin(req, res);
  // 	} else if (req.method === HTTP_METHOD_GET && action === "signout") {
  // 		return signout(req, res);
  // 	} else if (req.method === HTTP_METHOD_GET && action === "session") {
  // 		return getSessionLocalApi(req, res);
  // 	} else {
  // 		return res
  // 			.status(405)
  // 			.end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
  // 	}
  // }

  const response: GeographyResponseType = await getGeography()
  res.status(200).json(response)
}

const getGeography = async (): Promise<GeographyResponseType> => {
  const { data: response } = await httpClient.get<GeographyResponseType>(`/geographies`, {
    baseURL: process.env.NEXT_PUBLIC_THAI_ADDRESS_API,
  })

  return response
}

const getProvince = async (): Promise<ProvinceResponseType> => {
  const { data: response } = await httpClient.get<ProvinceResponseType>(`/provinces`, {
    baseURL: process.env.NEXT_PUBLIC_THAI_ADDRESS_API,
  })

  return response
}