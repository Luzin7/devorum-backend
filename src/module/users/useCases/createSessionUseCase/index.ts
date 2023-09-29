import { Injectable } from '@infra/containers/Injectable'
import { User } from '@module/users/entities/User'
import { WrongCredentialsError } from '@module/users/errors/WrongCredentialsError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { AuthProvider } from '@providers/auth/contracts/AuthProvider'
import { CryptographyProvider } from '@providers/cryptography/contracts/CryptographyProvider'
import { inject, injectable } from 'tsyringe'
import { UseCase } from '@shared/core/module/UseCase'

interface Request {
  email: string
  password: string
}

type Response = Either<
  WrongCredentialsError,
  {
    user: User
    accessToken: string
    refreshToken: string
  }
>

@injectable()
export class CreateSessionUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Providers.Cryptography)
    private readonly cryptographyProvider: CryptographyProvider,

    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,

    @inject(Injectable.Providers.Auth)
    private readonly authProvider: AuthProvider,
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const passwordIsValid = await this.cryptographyProvider.hashComparer({
      hash: user.password,
      salt: user.salt,
      plainText: password,
    })

    if (!passwordIsValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.authProvider.encrypt(user.id.toString())
    const refreshToken = await this.authProvider.encrypt(
      user.id.toString(),
      'refresh',
    )

    return right({
      user,
      accessToken,
      refreshToken,
    })
  }
}
