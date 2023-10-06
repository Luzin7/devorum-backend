import { container } from 'tsyringe'
import { Repositories } from '../Repositories'
import { UsersPrismaRepository } from '@infra/database/prisma/users/UsersPrismaRepository'
import { RefreshTokensPrismaRepository } from '@infra/database/prisma/users/RefreshTokensPrismaRepository'

container.registerSingleton(Repositories.Users, UsersPrismaRepository)
container.registerSingleton(
  Repositories.RefreshTokens,
  RefreshTokensPrismaRepository,
)
