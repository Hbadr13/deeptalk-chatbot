import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices


// In development, the command next dev clears Node.js cache on run.This in turn 
// initializes a new PrismaClient instance each time due to hot reloading that 
// creates a connection to the database.This can quickly exhaust the database
//  connections as each PrismaClient instance holds its own connection pool.

const prismaClientSingleton = () => {
    console.log('new prisma instance.')
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}
 
const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
