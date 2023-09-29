import { Injectable } from '@infra/containers/Injectable'
import { User } from '@module/users/entities/User'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { inject, injectable } from 'tsyringe'

interface Request {
  id: string
}

type Response = Either<
  UserNotFoundError,
  {
    user: User
  }
>

@injectable()
export class GetUserUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right({
      user,
    })
  }
}
