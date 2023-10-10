import { Comment } from '@module/comments/entities/Comment'
import { CommentWithAuthor } from '@module/comments/valueObjects/commentWithAuthor'
import {
  Comment as CommentPrisma,
  User as UserPrisma,
  Prisma,
} from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

type CommentWithAuthorPrisma = CommentPrisma & {
  author: UserPrisma
}

export class CommentsPrismaMapper {
  static toEntity(raw: CommentPrisma): Comment {
    return Comment.create(
      {
        authorId: new UniqueId(raw.authorId),
        content: raw.content,
        topicId: new UniqueId(raw.topicId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueId(raw.id),
    )
  }

  static toCommentWithAuthor(raw: CommentWithAuthorPrisma) {
    return CommentWithAuthor.create({
      authorId: new UniqueId(raw.author.id),
      authorName: raw.author.name,
      commentContent: raw.content,
      commentCreatedAt: raw.createdAt,
      commentId: new UniqueId(raw.id),
      commentUpdatedAt: raw.updatedAt,
    })
  }

  static toPrisma(comment: Comment): Prisma.CommentUncheckedCreateInput {
    return {
      authorId: comment.authorId.toString(),
      content: comment.content,
      topicId: comment.topicId.toString(),
      createdAt: comment.createdAt,
      id: comment.id.toString(),
      updatedAt: comment.updatedAt,
    }
  }
}
