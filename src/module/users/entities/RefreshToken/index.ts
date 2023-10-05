import { Optional } from '@prisma/client/runtime/library'
import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/entities/UniqueId'

export interface RefreshTokenProps {
  createdAt: Date
  userId: UniqueId
  refreshToken: string
  expiresDate: Date
}

export class RefreshToken extends AggregateRoot<RefreshTokenProps> {
  static create(
    props: Optional<RefreshTokenProps, 'createdAt'>,
    id?: UniqueId,
  ) {
    const refreshTokenProps: RefreshTokenProps = {
      createdAt: props.createdAt ?? new Date(),
      userId: props.userId,
      refreshToken: props.refreshToken,
      expiresDate: props.expiresDate,
    }
    const newToken = new RefreshToken(refreshTokenProps, id)

    return newToken
  }

  get createdAt() {
    return this.props.createdAt
  }

  get usedId() {
    return this.props.userId
  }

  get refreshToken() {
    return this.props.refreshToken
  }

  get expiresDate() {
    return this.props.expiresDate
  }
}
