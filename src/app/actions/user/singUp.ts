'use server'
import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export interface signUpProps { email: string, password: string, phoneNumber: string, username: string, birthdate: string }

export const signUp = async ({ email, phoneNumber, username, birthdate, password }: signUpProps) => {
    try {
        var user = await prisma.user.findUnique({ where: { phoneNumber: phoneNumber } })
        if (user)
            return "user alrady exists"
        const hashPassword = await bcrypt.hashSync(password, 10)
        user = await prisma.user.create({
            data: {
                phoneNumber: phoneNumber,
                username: username,
                birthdate: birthdate,
                hashPassword,
                email: email,
                lastName: '',
            }
        })
        return "succes"
    } catch (error) {
        return 'error'
    }
}
