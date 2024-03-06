import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, ISODateString, User } from "next-auth";
import { User as UserModel } from "../models/User";
import { JWT } from "next-auth/jwt";
import connectToMongoDB from "../libs/mongodb";
import jwt from 'jsonwebtoken';


export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
  token: string;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

export default NextAuth({
  pages: {
    signIn: "/login"
  },

  providers: [
    Credentials({
      name: "Welcome Back",
      type: "credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectToMongoDB();
        const user = await UserModel.findOne({ email: credentials?.email });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectToMongoDB();
      try {
        const findUser = await UserModel.findOne({ email: user.email });

        if (findUser) {
          return true;
        } else {
          return false;
        }

      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        token.user = user;
      }

      return token;
    },
    async session({ session, token, user }: { session: any; token: any; user: User }) {
      //session.user = token.user as CustomUser;
      session.user = token.user;
      session.token = token.accessToken;
      return session;
    }
  }
});
