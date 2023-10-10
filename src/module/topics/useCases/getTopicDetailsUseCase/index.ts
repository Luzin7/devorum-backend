import { Injectable } from '@infra/containers/Injectable'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { TopicDetails } from '@module/topics/valueObjects/TopicDetails'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { inject, injectable } from 'tsyringe'

interface Request {
  topicId: string
}

type Response = Either<
  TopicNotFoundError,
  {
    topic: TopicDetails
  }
>

@injectable()
export class GetTopicDetailsUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Topics)
    private readonly topicsRepository: TopicsRepository,
  ) {}

  async execute({ topicId }: Request): Promise<Response> {
    const topic = await this.topicsRepository.findByIdWithDetails(topicId)

    if (!topic) {
      return left(new TopicNotFoundError())
    }

    return right({ topic })
  }
}
