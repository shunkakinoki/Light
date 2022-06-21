import type { CredentialsMessage, User } from "@lightdotso/types";
import { PrismaClient } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const Auth = NextAuth({
  providers: [
    CredentialsProvider({
      id: "web3",
      name: "Web3",
      credentials: {
        address: { label: "Address", type: "text" },
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        const verifyRes = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: JSON.parse(credentials?.message),
              signature: credentials?.signature,
            }),
          },
        );

        if (verifyRes.ok && credentials) {
          const address = credentials.address;
          const message = JSON.parse(credentials.message) as CredentialsMessage;

          try {
            const user = await prisma.user.upsert({
              where: {
                address: address,
              },
              create: {
                address: address,
                domain: message.domain,
                lastIssuedAt: message.issuedAt,
              },
              update: {
                address: address,
                domain: message.domain,
                lastIssuedAt: message.issuedAt,
              },
            });
            return user;
          } catch (err) {
            console.error(err?.message);
          }
        }

        // eslint-disable-next-line no-empty
        if (!verifyRes.ok) {
        }
        return null;
      },
    }),
  ],
  jwt: {
    async encode(params): Promise<string> {
      return sign(params.token, params.secret, { algorithm: "HS256" });
    },

    async decode(params): Promise<any | null> {
      return verify(params.token, params.secret);
    },
  },
  session: { strategy: "jwt" },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, account, user }) {
      token.auth_time = Date.now();
      const isUserSignedIn = user ? true : false;
      if (isUserSignedIn) {
        token.address = user?.address;
        token.data = user;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token }) {
      const encodedToken = sign(token, "shunkakinoki", {
        algorithm: "HS256",
      });
      try {
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
      } catch (err) {
        console.error(err?.message);
      }
      try {
        session.token = encodedToken;
        session.address = token.address;
        session.user = token.data;
        session.time = new Date().getTime();
      } catch (err) {
        console.error(err?.message);
      }
      return session;
    },
  },
});

export const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "no-cache");
  return await Auth(req, res);
};

export default auth;
