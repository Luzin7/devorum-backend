import { Injectable } from '@infra/containers/Injectable'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError'
import { inject, injectable } from 'tsyringe'
import { Topic } from '@module/topics/entities/Topic'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { TextProvider } from '@providers/text/contracts/TextProvider'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { ContentIsInvalidError } from '@module/topics/errors/ContentIsInvalidError'

interface Request {
  content: string
  authorId: string
  topicId: string
  title: string
}

type Response = Either<
  | TopicNotFoundError
  | ContentIsInvalidError
  | UserNotFoundError
  | PermissionDeniedError,
  {
    topic: Topic
  }
>

@injectable()
export class UpdateTopicUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Topics)
    private readonly topicsRepository: TopicsRepository,

    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,

    @inject(Injectable.Providers.Text)
    private readonly textRepository: TextProvider,
  ) {}

  async execute({
    authorId,
    content,
    title,
    topicId,
  }: Request): Promise<Response> {
    const userExists = await this.usersRepository.findById(authorId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const contentIsValid = this.textRepository.htmlIsValid(content)

    if (!contentIsValid) {
      return left(new ContentIsInvalidError())
    }

    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      return left(new TopicNotFoundError())
    }

    if (topic.authorId.toString() !== authorId) {
      return left(new PermissionDeniedError())
    }

    topic.title = title
    topic.content = content

    await this.topicsRepository.save(topic)

    return right({
      topic,
    })
  }
}
