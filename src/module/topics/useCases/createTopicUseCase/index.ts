import { Injectable } from '@infra/containers/Injectable'
import { Topic } from '@module/topics/entities/Topic'
import { ContentIsInvalidError } from '@module/topics/errors/ContentIsInvalidError'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { TextProvider } from '@providers/text/contracts/TextProvider'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { inject, injectable } from 'tsyringe'

interface Request {
  content: string
  authorId: string
  title: string
}

type Response = Either<
  UserNotFoundError | ContentIsInvalidError,
  {
    topic: Topic
  }
>

@injectable()
export class CreateTopicUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Topics)
    private readonly topicsRepository: TopicsRepository,

    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,

    @inject(Injectable.Providers.Text)
    private readonly textRepository: TextProvider,
  ) {}

  async execute({ content, authorId, title }: Request): Promise<Response> {
    const userExists = await this.usersRepository.findById(authorId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const contentIsValid = this.textRepository.htmlIsValid(content)

    if (!contentIsValid) {
      return left(new ContentIsInvalidError())
    }

    const topic = Topic.create({
      content,
      authorId: userExists.id,
      title,
    })

    await this.topicsRepository.create(topic)

    return right({ topic })
  }
}
