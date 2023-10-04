import { RefreshToken } from '@module/users/entities/RefreshToken'
import { RefreshToken as RefreshTokenPrisma, Prisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class RefreshTokensPrismaMapper {
  static toEntity(raw: RefreshTokenPrisma): RefreshToken {
    return RefreshToken.create(
      {
        userId: new UniqueId(raw.userId),
        refreshToken: raw.refreshToken,
        expiresDate: raw.expiresDate,
        createdAt: raw.createdAt,
      },
      new UniqueId(raw.id),
    )
  }

  static toPrisma(
    refreshToken: RefreshToken,
  ): Prisma.RefreshTokenUncheckedCreateInput {
    return {
      expiresDate: refreshToken.expiresDate,
      refreshToken: refreshToken.refreshToken,
      userId: refreshToken.usedId.toString(),
      createdAt: refreshToken.createdAt,
      id: refreshToken.id.toString(),
    }
  }
}
