import { RefreshToken } from '@module/users/entities/RefreshToken'
import {
  FindByUserIdAndRefreshTokenProps,
  RefreshTokensRepository,
} from '@module/users/repositories/contracts/RefreshTokensRepository'

export class RefreshTokensInMemoryRepository
  implements RefreshTokensRepository
{
  refreshTokens: RefreshToken[] = []

  async create(refreshToken: RefreshToken): Promise<void> {
    this.refreshTokens.push(refreshToken)
  }

  async findByUserIdAndRefreshToken({
    refreshToken,
    userId,
  }: FindByUserIdAndRefreshTokenProps): Promise<RefreshToken | null> {
    const refreshTokenSaved = this.refreshTokens.find(
      (rt) =>
        rt.refreshToken === refreshToken && rt.usedId.toString() === userId,
    )

    if (!refreshTokenSaved) {
      return null
    }

    return refreshTokenSaved
  }

  async delete(id: string): Promise<void> {
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id.toString() !== id,
    )
  }
}
