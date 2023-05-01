import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from "@/common/utils/cookies.util";
import { setLocalStorage } from "@/common/utils/localStorage.util";

export default async function acceptCookies(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // Set the cookie_acceptance cookie
    setCookie(res, 'cookie_acceptance', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 1000, // 365 days in milliseconds
    });

    // Set the cookie acceptance in local storage
    setLocalStorage('cookie_acceptance', 'true');

    res.status(200).json({ message: 'Cookie consent accepted.' });
  } catch (error: any) {
    res.status(400).json({ message: 'An error occurred while setting the cookie.' });
  }
}
