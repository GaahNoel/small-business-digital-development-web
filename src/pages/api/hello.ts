// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { api } from '../../service/api';
import * as jwt from 'jsonwebtoken';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const decryptedToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    decode: async ({ secret, token }) => {
      return jwt.verify(token as string, secret, {
        algorithms: ['HS256'],
      }) as JWT;
    },
  });
  const token = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    const response = await api.post(
      'order/create',
      {
        ...req.body,
        buyerId: decryptedToken?.sub,
      },
      {
        headers: {
          'content-type': 'application/json',
          token,
        },
      },
    );
  } catch (error) {
    console.error('erro');
  } finally {
    res.status(200).json({ name: 'John Doe' });
  }
}
