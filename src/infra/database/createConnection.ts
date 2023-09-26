import { env } from '@env/index'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

prisma
  .$connect()
  .then(() => console.log('database is conectado'))
  .catch((error) => console.error(error))
