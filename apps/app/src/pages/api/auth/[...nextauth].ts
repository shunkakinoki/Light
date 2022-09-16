import type { IncomingMessage } from "http";

import type { User } from "@lightdotso/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

const prisma = new PrismaClient();

export const getAuthOptions = (req: IncomingMessage): NextAuthOptions => {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}"),
          );

          const nextAuthUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : null);
          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;
          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(credentials?.signature || "");

          const user = await prisma.user.upsert({
            where: {
              address: siwe.address,
            },
            create: {
              address: siwe.address,
              domain: siwe.domain,
              lastIssuedAt: siwe.issuedAt,
            },
            update: {
              address: siwe.address,
              domain: siwe.domain,
              lastIssuedAt: siwe.issuedAt,
            },
          });

          return user;
        } catch (err) {
          return null;
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      name: "Ethereum",
    }),
  ];

  return {
    callbacks: {
      async jwt({ token, user }) {
        token.auth_time = Date.now();
        const isUserSignedIn = user ? true : false;
        if (isUserSignedIn) {
          token.address = user?.address;
          token.data = user;
        }
        return token;
      },
      async session({ session, token }) {
        // eslint-disable-next-line no-console
        console.log(session);
        // eslint-disable-next-line no-console
        console.log(token);
        const user = token.data as User;

        await Promise.all([
          prisma.session.upsert({
            where: {
              issuedAt_userId: {
                issuedAt: user.lastIssuedAt,
                userId: user.id,
              },
            },
            create: {
              issuedAt: user.lastIssuedAt,
              userId: user.id,
            },
            update: {
              issuedAt: user.lastIssuedAt,
            },
          }),
        ]);
        return session;
      },
    },
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  };
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  const isDefaultSigninPage =
    req.method === "GET" &&
    req.query.nextauth.find(value => {
      return value === "signin";
    });

  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}
