import { IncomingMessage } from 'http';
import { getToken } from 'next-auth/jwt';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import * as jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

type Token = {
  id: string;
};

export const jwtDecoder = async (req: Request) => {
  const token = (await getToken({
    req,
    raw: false,
    secret: process.env.NEXTAUTH_SECRET,
    decode: async ({ secret, token }) => {
      return jwt.verify(token as string, secret, {
        algorithms: ['HS256'],
      }) as JWT;
    },
  })) as Token;
  return { accountId: token.id };
};
