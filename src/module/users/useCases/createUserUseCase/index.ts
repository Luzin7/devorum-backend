import { Injectable } from '@infra/containers/Injectable'
import { User } from '@module/users/entities/User'
import { UserAlreadyExitesError } from '@module/users/errors/UserAlreadyExitesError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { CryptographyProvider } from 'providers/cryptography/contracts/CryptographyProvider'
import { inject, injectable } from 'tsyringe'

interface Request {
  name: string
  password: string
  email: string
}

type Response = Either<
  UserAlreadyExitesError,
  {
    user: User
  }
>

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,

    @inject(Injectable.Providers.Cryptography)
    private readonly cryptographyProvider: CryptographyProvider,
  ) {}

  async execute({ email, name, password }: Request): Promise<Response> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExitesError())
    }

    const { hash, salt } = await this.cryptographyProvider.hashCreator(password)

    const user = User.create({
      email,
      name,
      password: hash,
      salt,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
