
import prisma from "@/lib/prisma";
import { Account, AuthOptions, Profile, Session } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import FortyTwoProvider from "next-auth/providers/42-school";
import { User } from "@prisma/client";
import { User1 } from "@/lib/types";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                phoneNumber: {
                    // label: 'Email',
                    type: 'text',
                    // placeholder: 'your@email.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials): Promise<any> => {
                if (!credentials) {
                    return null;
                }
                const { phoneNumber, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        phoneNumber: phoneNumber
                    }
                });
                if (!user) {
                    return null;
                }
                const userPassword = user.hashPassword;
                const isValidPassword = bcrypt.compareSync(password, userPassword);
                if (!isValidPassword) {
                    return null;
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: 'error'
    },
    secret: process.env.JWE_SECRET_KY,
    jwt: {
        maxAge: 60 * 60 * 24 * 1,
        async encode({ secret, token }) {
            // console.log('---------1-------')
            // console.log('serect:', secret)
            // console.log('token:', token)
            if (!token) {
                throw new Error('No token to encode');
            }
            return jwt.sign(token, secret);
        },
        async decode({ secret, token }) {
            // console.log('---------2-------')
            // console.log('serect:', secret)
            // console.log('token:', token)
            if (!token) {
                throw new Error('No token to decode');
            }
            const decodedToken = jwt.verify(token, secret);
            // .log('-->', decodedToken)
            if (typeof decodedToken === 'string') {
                // console.log('-----------1')
                return JSON.parse(decodedToken);
            } else {
                // console.log('-----------2')
                return decodedToken;
            }
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async session({ token, session }) {
            // console.log('decodedToken', decodedToken)
            session.user = token.user
            return session
        },
        async jwt({ token, user, account }) {
            console.log('account', account)

            // console.log('token:', token)
            if (user) token.user = user as unknown as User1;
            return token;
        },
        async signIn({ user, account, profile, email, credentials }) {
            console.log('user', user)
            console.log('account 2', account?.access_token)
            return true
        },
    },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
