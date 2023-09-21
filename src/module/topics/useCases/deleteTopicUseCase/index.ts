import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { PermissioDenidedError } from '@shared/erros/PermissionDeniedError'

interface Request {
  topicId: string
  authorId: string
}

type Response = Either<
  UserNotFoundError | TopicNotFoundError | PermissioDenidedError,
  null
>

export class DeleteTopicUseCase {
  constructor(
    private readonly topicsRepository: TopicsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ topicId, authorId }: Request): Promise<Response> {
    const userExists = await this.usersRepository.findById(authorId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const topicExists = await this.topicsRepository.findById(topicId)

    if (!topicExists) {
      return left(new TopicNotFoundError())
    }

    if (!topicExists.authorId.equals(userExists.id)) {
      return left(new PermissioDenidedError())
    }

    await this.topicsRepository.delete(topicId)
    return right(null)
  }
}
