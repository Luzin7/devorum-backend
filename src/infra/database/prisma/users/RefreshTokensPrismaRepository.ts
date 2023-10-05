import {
  FindByUserIdAndRefreshTokenProps,
  RefreshTokensRepository,
} from '@module/users/repositories/contracts/RefreshTokensRepository'
import { prisma } from '@infra/database/createConnection'
import { RefreshToken } from '@module/users/entities/RefreshToken'

import { RefreshTokensPrismaMapper } from './RefreshTokensPrismaMapper'

export class RefreshTokensPrismaRepository implements RefreshTokensRepository {
  async create(refreshToken: RefreshToken): Promise<void> {
    await prisma.refreshToken.create({
      data: RefreshTokensPrismaMapper.toPrisma(refreshToken),
    })
  }

  async findByUserIdAndRefreshToken(
    props: FindByUserIdAndRefreshTokenProps,
  ): Promise<RefreshToken | null> {
    const foundToken = await prisma.refreshToken.findUnique({
      where: {
        userId: props.userId,
        refreshToken: props.refreshToken,
      },
    })
    if (foundToken) {
      return RefreshTokensPrismaMapper.toEntity(foundToken)
    }
    return null
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: {
        id,
      },
    })
  }
}
