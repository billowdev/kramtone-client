import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getDevConsentAcceptance(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // Get the cookie_acceptance cookie
    const cookieAcceptance = req.cookies.dev_acceptance;
    console.log(req.cookies)
    if (cookieAcceptance) {
      res.status(200).json({ message: 'Dev consent accepted.', accepted: true });
    } else {
      res.status(200).json({ message: 'Dev consent not accepted.', accepted: false });
    }
  } catch (error: any) {
    res.status(400).json({ message: 'An error occurred while getting the cookie.' });
  }
}
