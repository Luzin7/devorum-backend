import { Injectable } from '@infra/containers/Injectable'
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError'
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError'
import { inject, injectable } from 'tsyringe'

interface Request {
  topicId: string
  commentId: string
  authorId: string
}

type Response = Either<
  | UserNotFoundError
  | TopicNotFoundError
  | PermissionDeniedError
  | CommentNotFoundError,
  null
>

@injectable()
export class DeleteCommentUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Topics)
    private readonly topicsRepository: TopicsRepository,

    @inject(Injectable.Repositories.Comments)
    private readonly commentsRepository: CommentsRepository,

    @inject(Injectable.Repositories.Users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ topicId, authorId, commentId }: Request): Promise<Response> {
    const userExists = await this.usersRepository.findById(authorId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const topicExists = await this.topicsRepository.findById(topicId)

    if (!topicExists) {
      return left(new TopicNotFoundError())
    }

    const commentExists = await this.commentsRepository.findById(commentId)

    if (!commentExists) {
      return left(new CommentNotFoundError())
    }

    if (!commentExists.authorId.equals(userExists.id)) {
      return left(new PermissionDeniedError())
    }

    await this.commentsRepository.delete(commentId)

    return right(null)
  }
}
