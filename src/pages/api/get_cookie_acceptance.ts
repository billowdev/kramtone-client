import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getCookieAcceptance(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // Get the cookie_acceptance cookie
    const cookieAcceptance = req.cookies.cookie_acceptance;

    if (cookieAcceptance) {
      res.status(200).json({ message: 'Cookie consent accepted.', accepted: true });
    } else {
      res.status(200).json({ message: 'Cookie consent not accepted.', accepted: false });
    }
  } catch (error: any) {
    res.status(400).json({ message: 'An error occurred while getting the cookie.' });
  }
}
