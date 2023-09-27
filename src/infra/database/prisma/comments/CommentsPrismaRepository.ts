import { prisma } from '@infra/database/createConnection'
import { Comment } from '@module/comments/entities/Comment'
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository'
import { CommentsPrismaMapper } from './CommentsPrismaMapper'

export class CommentsPrismaRepository implements CommentsRepository {
  async create(comment: Comment): Promise<void> {
    await prisma.comment.create({
      data: CommentsPrismaMapper.toPrisma(comment),
    })
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!comment) return null

    return CommentsPrismaMapper.toEntity(comment)
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.delete({
      where: {
        id,
      },
    })
  }

  async save(comment: Comment): Promise<void> {
    await prisma.comment.update({
      where: {
        id: comment.id.toString(),
      },
      data: CommentsPrismaMapper.toPrisma(comment),
    })
  }
}
