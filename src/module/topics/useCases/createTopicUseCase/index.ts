import { Topic } from '@module/topics/entities/Topic'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'

interface Request {
  content: string
  authorId: string
  title: string
}

type Response = Either<
  UserNotFoundError,
  {
    topic: Topic
  }
>

export class CreateTopicUseCase {
  constructor(
    private readonly topicsRepository: TopicsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ content, authorId, title }: Request): Promise<Response> {
    const userExists = await this.usersRepository.findById(authorId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const topic = Topic.create({
      authorName: userExists.name,
      content,
      authorId: userExists.id,
      title,
    })

    await this.topicsRepository.create(topic)

    return right({ topic })
  }
}
