import { AuthProvider } from '@providers/auth/contracts/AuthProvider'
import { DateProvider } from '@providers/date/contracts/DateProvider'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { SessionExpiredError } from '@module/users/errors/SessionExpiredError'
import { inject, injectable } from 'tsyringe'
import { Injectable } from '@infra/containers/Injectable'
import { RefreshTokensRepository } from '@module/users/repositories/contracts/RefreshTokensRepository'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { RefreshToken } from '@module/users/entities/RefreshToken'
import { env } from '@env/index'

interface Request {
  refreshTokenReceived: string
}
type Response = Either<
  SessionExpiredError | UserNotFoundError,
  { accessToken: string; refreshToken: string }
>

@injectable()
export class RefreshTokenUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.RefreshTokens)
    private readonly refreshTokensRepository: RefreshTokensRepository,

    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,

    @inject(Injectable.Providers.Date)
    private readonly dateProvider: DateProvider,

    @inject(Injectable.Providers.Auth)
    private readonly authProvider: AuthProvider,
  ) {}

  async execute({ refreshTokenReceived }: Request): Promise<Response> {
    const { sub } = await this.authProvider.decrypt(refreshTokenReceived)

    const refreshTokenIsValid = !!sub

    if (!refreshTokenIsValid) {
      return left(new SessionExpiredError())
    }

    const user = await this.usersRepository.findById(sub)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const refreshTokenSaved =
      await this.refreshTokensRepository.findByUserIdAndRefreshToken({
        userId: user.id.toString(),
        refreshToken: refreshTokenReceived,
      })

    if (!refreshTokenSaved) {
      return left(new SessionExpiredError())
    }

    const refreshTokenIsNotExpired = this.dateProvider.isBefore({
      initialDate: new Date(),
      endDate: refreshTokenSaved.expiresDate,
    })

    if (!refreshTokenIsNotExpired) {
      return left(new SessionExpiredError())
    }

    this.refreshTokensRepository.delete(refreshTokenSaved.id.toString())
    const newRefreshToken = await this.authProvider.encrypt(
      user.id.toString(),
      'refresh',
    )
    const newAccessToken = await this.authProvider.encrypt(user.id.toString())
    const expiresDate = this.dateProvider.addDays(
      env.DAYS_TO_EXPIRES_REFRESH_TOKEN,
    )
    const refreshToken = RefreshToken.create({
      userId: user.id,
      expiresDate,
      refreshToken: newRefreshToken,
    })

    await this.refreshTokensRepository.create(refreshToken)
    return right({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
  }
}
