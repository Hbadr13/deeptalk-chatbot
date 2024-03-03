
import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import NextAuth from "next-auth/next";
import { UserInfo } from "@/lib/types";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                phoneNumber: {
                    label: 'phoneNumber',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials): Promise<any> => {
                try {

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
                    const { hashPassword, ...currentUser } = user;
                    const secretKay = process.env.JWE_SECRET_KY
                    if (!secretKay)
                        return null;
                    const accessToken = jwt.sign(currentUser, secretKay, { expiresIn: '1d' });
                    console.log('accessToken->', accessToken)
                    return {
                        ...currentUser,
                        accessToken
                    };
                } catch (error) {
                    return null
                }
            }
        })
    ],
    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: 'error'
    // },
    secret: process.env.JWE_SECRET_KY,
    jwt: {
        maxAge: 60 * 60 * 24 * 1,
        async encode({ secret, token }) {
            if (!token) {
                throw new Error('No token to encode');
            }
            return jwt.sign(token, secret);
        },
        async decode({ secret, token }) {
            if (!token) {
                throw new Error('No token to decode');
            }
            const decodedToken = jwt.verify(token, secret);
            if (typeof decodedToken === 'string') {
                return JSON.parse(decodedToken);
            } else {
                return decodedToken;
            }
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60
    },
    callbacks: {
        async session({ token, session }) {
            session.user = token.user
            return session
        },
        async jwt({ token, user, account }) {
            console.log('account', user)
            if (user) {
                token.user = user as unknown as UserInfo;
            }
            return token;
        },
    },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

