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

type Business = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
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
      return res.status(400).json({
        error: 'InvalidParamsError',
        params: ['auth'],
        message: 'Usuário não logado',
      });
    }

    const businessList = await api.get(`business/list/${decryptedToken?.id}`, {
      headers: {
        token,
      },
    });

    if (businessList.data) {
      const businessBelongsUser = businessList.data.filter(
        (business: Business) => {
          if (business.id === req.body.businessId) return true;
        },
      );

      if (businessBelongsUser.length) {
        return res.status(400).json({
          error: 'BusinessError',
          params: [''],
          message:
            'Não é possível realizar pedido em um estabelecimento que pertence ao usuário da sessão',
        });
      }
    }

    await api.post(
      'order/create',
      {
        ...req.body,
        buyerId: decryptedToken?.id,
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
      console.log(error.response);
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }
}
