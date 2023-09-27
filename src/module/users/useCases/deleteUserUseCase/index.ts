import { Injectable } from '@infra/containers/Injectable'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { inject, injectable } from 'tsyringe'

interface Request {
  id: string
}

type Response = Either<UserNotFoundError, null>

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.usersRepository.delete(id)
    return right(null)
  }
}
