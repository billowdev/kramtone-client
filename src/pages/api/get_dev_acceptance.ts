import type { NextApiRequest, NextApiResponse } from 'next';
import { getLocalStorage } from "@/common/utils/localStorage.util";

export default async function getDevConsentAcceptance(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // Get the dev_acceptance cookie
    const cookieAcceptance = req.cookies.dev_acceptance;

    // If cookie not found, get the acceptance from local storage
    if (!cookieAcceptance) {
      const localAcceptance = getLocalStorage('dev_acceptance');
      if (localAcceptance) {
        res.status(200).json({ message: 'Dev consent accepted.', accepted: true });
        return;
      }
    }

    if (cookieAcceptance) {
      res.status(200).json({ message: 'Dev consent accepted.', accepted: true });
    } else {
      res.status(200).json({ message: 'Dev consent not accepted.', accepted: false });
    }
  } catch (error: any) {
    res.status(400).json({ message: 'An error occurred while getting the cookie.' });
  }
}
