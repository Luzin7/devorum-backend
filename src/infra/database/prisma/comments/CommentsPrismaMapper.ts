import { Comment } from '@module/comments/entities/Comment'
import { Comment as CommentPrisma, Prisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class CommentsPrismaMapper {
  static toEntity(raw: CommentPrisma): Comment {
    return Comment.create(
      {
        authorId: new UniqueId(raw.authorId),
        authorName: raw.authorName,
        content: raw.content,
        topicId: new UniqueId(raw.topicId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueId(raw.id),
    )
  }

  static toPrisma(comment: Comment): Prisma.CommentUncheckedCreateInput {
    return {
      authorId: comment.authorId.toString(),
      authorName: comment.authorName,
      content: comment.content,
      topicId: comment.topicId.toString(),
      createdAt: comment.createdAt,
      id: comment.id.toString(),
      updatedAt: comment.updatedAt,
    }
  }
}
