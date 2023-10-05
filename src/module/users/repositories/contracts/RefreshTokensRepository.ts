import { RefreshToken } from '@module/users/entities/RefreshToken'

interface FindByUserIdAndRefreshTokenProps {
  userId: string
  refreshToken: string
}

export abstract class RefreshTokensRepository {
  abstract create(refreshToken: RefreshToken): Promise<void>
  abstract findByUserIdAndRefreshToken(
    props: FindByUserIdAndRefreshTokenProps,
  ): Promise<RefreshToken | null>

  abstract delete(id: string): Promise<void>
}
