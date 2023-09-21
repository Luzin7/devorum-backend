import { Comment } from '@module/comments/entities/Comment'
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError'
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'

interface Request {
  content: string
  authorId: string
  topicId: string
}

type Response = Either<
  CommentNotFoundError,
  {
    comment: Comment
  }
>

export class CreateCommentUseCase {
  constructor(
    private readonly topicsRepository: TopicsRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ content, authorId, topicId }: Request): Promise<Response> {
    const userExists = await this.usersRepository.findById(authorId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const topicExists = await this.topicsRepository.findById(topicId)

    if (!topicExists) {
      return left(new TopicNotFoundError())
    }

    const comment = Comment.create({
      authorName: userExists.name,
      content,
      authorId: userExists.id,
      topicId: topicExists.id,
    })

    await this.commentsRepository.create(comment)

    return right({ comment })
  }
}
