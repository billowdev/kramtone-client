import type { NextApiRequest, NextApiResponse } from 'next';
import { getLocalStorage } from "@/common/utils/localStorage.util";

export default async function getCookieAcceptance(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // Get the cookie_acceptance cookie
    const cookieAcceptance = req.cookies.cookie_acceptance;

    // If cookie not found, get the acceptance from local storage
    if (!cookieAcceptance) {
      const localAcceptance = getLocalStorage('cookie_acceptance');
      if (localAcceptance) {
        res.status(200).json({ message: 'Cookie consent accepted.', accepted: true });
        return;
      }
    }

    if (cookieAcceptance) {
      res.status(200).json({ message: 'Cookie consent accepted.', accepted: true });
    } else {
      res.status(200).json({ message: 'Cookie consent not accepted.', accepted: false });
    }
  } catch (error: any) {
    res.status(400).json({ message: 'An error occurred while getting the cookie.' });
  }
}
