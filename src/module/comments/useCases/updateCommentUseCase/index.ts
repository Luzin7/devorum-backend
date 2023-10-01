import { Injectable } from '@infra/containers/Injectable'
import { Comment } from '@module/comments/entities/Comment'
import { CommentNotCanBeUpdatedError } from '@module/comments/errors/CommentNotCanBeUpdatedError'
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError'
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError'
import { inject, injectable } from 'tsyringe'

interface Request {
  commentId: string
  authorId: string
  content?: string
}

type Response = Either<
  | PermissionDeniedError
  | TopicNotFoundError
  | CommentNotFoundError
  | CommentNotCanBeUpdatedError,
  { comment: Comment }
>

@injectable()
export class UpdateCommentUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Comments)
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async execute({ authorId, commentId, content }: Request): Promise<Response> {
    const comment = await this.commentsRepository.findById(commentId)

    if (!comment) {
      return left(new CommentNotFoundError())
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new PermissionDeniedError())
    }

    if (!content) {
      return left(new CommentNotCanBeUpdatedError())
    }

    comment.content = content

    await this.commentsRepository.save(comment)

    return right({
      comment,
    })
  }
}
