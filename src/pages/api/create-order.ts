// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { api } from '../../service/api';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

type Data = {
  error?: string;
  params?: string[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
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

    if (!token) {
      res.status(400).json({
        error: 'InvalidParamsError',
        params: ['auth'],
        message: 'Usuário não logado',
      });
    }

    await api.post(
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
    res.status(200).send({});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res
        .status(error.response?.status as number)
        .json({ message: error.response?.data.error });
    }
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}