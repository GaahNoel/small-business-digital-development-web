import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as jwt from 'jsonwebtoken';
import { api } from '../../../service/api';
import { JWT } from 'next-auth/jwt';

export default NextAuth({
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encode: async ({ secret, token }) => {
      return jwt.sign({ ...token, userId: token?.id }, secret, {
        algorithm: 'HS256',
      });
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token as string, secret, {
        algorithms: ['HS256'],
      }) as JWT;
    },
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      const response = await api.post('signup', {
        name: token.name,
        email: token.email,
        provider: 'socialMedia',
      });

      const { id } = response.data;

      if (!token.id) {
        token.id = id;
      }

      return token;
    },
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      checks: 'both',
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: 'both',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        id: {
          label: 'Id',
          type: 'text',
        },
        email: {
          label: 'Email',
          type: 'email',
        },
      },
      async authorize(credentials) {
        const user = {
          id: credentials?.id,
          email: credentials?.email,
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
});
