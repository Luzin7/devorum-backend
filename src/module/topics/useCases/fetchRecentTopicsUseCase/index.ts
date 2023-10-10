import { Injectable } from '@infra/containers/Injectable'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor'
import { TextProvider } from '@providers/text/contracts/TextProvider'
import { Either, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { inject, injectable } from 'tsyringe'

interface Request {
  page?: number
  perPage?: number
}

type Response = Either<
  null,
  {
    topics: TopicWithAuthor[]
  }
>

@injectable()
export class FetchRecentTopicsUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Topics)
    private readonly topicsRepository: TopicsRepository,

    @inject(Injectable.Providers.Text)
    private readonly textProvider: TextProvider,
  ) {}

  async execute({ page = 1, perPage = 20 }: Request): Promise<Response> {
    const topics = await this.topicsRepository.findManyRecentWithAuthor({
      page,
      perPage,
    })

    topics.forEach((topic) =>
      topic.makeAssertionWithExternal(this.textProvider.getTextOfHTML),
    )

    return right({
      topics,
    })
  }
}
