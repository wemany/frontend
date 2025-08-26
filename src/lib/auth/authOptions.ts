import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { credentialsProvider } from "@/lib/auth/credentials-provider";
import { jwtCallback, sessionCallback } from "@/lib/auth/callbacks";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(credentialsProvider),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 15 * 60, // 15 minutes
  },
};
