import { RefreshToken } from '@module/users/entities/RefreshToken'
import { RefreshTokensRepository } from '@module/users/repositories/contracts/RefreshTokensRepository'

export class RefreshTokensInMemoryRepository
  implements RefreshTokensRepository
{
  refreshTokens: RefreshToken[] = []

  async create(refreshToken: RefreshToken): Promise<void> {
    this.refreshTokens.push(refreshToken)
  }
}
