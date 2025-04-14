import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: 200;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  return res.status(200).end();
}
