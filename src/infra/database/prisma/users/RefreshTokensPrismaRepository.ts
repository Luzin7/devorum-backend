import { prisma } from '@infra/database/createConnection'
import { RefreshToken } from '@module/users/entities/RefreshToken'
import { RefreshTokensRepository } from '@module/users/repositories/contracts/RefreshTokensRepository'
import { RefreshTokensPrismaMapper } from './RefreshTokensPrismaMapper'

export class RefreshTokensPrismaRepository implements RefreshTokensRepository {
  async create(refreshToken: RefreshToken): Promise<void> {
    await prisma.refreshToken.create({
      data: RefreshTokensPrismaMapper.toPrisma(refreshToken),
    })
  }
}
