import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient
try {
  prismaClient = new PrismaClient()
} catch {
  console.warn('[AI Studio] Database not connected — using mock')
  const noOp = { 
    findMany: async () => [], 
    findFirst: async () => null,
    findUnique: async () => null, 
    create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {}, 
    delete: async () => ({}) 
  }
  prismaClient = new Proxy({}, { get: () => noOp }) as any
}

export const prisma = prismaClient
