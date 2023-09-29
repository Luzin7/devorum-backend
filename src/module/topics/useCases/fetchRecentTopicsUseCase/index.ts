import { Injectable } from '@infra/containers/Injectable'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor'
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
  ) {}

  async execute({ page = 1, perPage = 20 }: Request): Promise<Response> {
    const topics = await this.topicsRepository.findManyRecentWithAuthor({
      page,
      perPage,
    })

    return right({
      topics,
    })
  }
}
