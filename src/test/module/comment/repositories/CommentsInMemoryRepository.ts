import { Comment } from '@module/comments/entities/Comment'
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class CommentsInMemoryRepository extends CommentsRepository {
  comments: Comment[] = []

  async save(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(comment: Comment): Promise<void> {
    this.comments.push(comment)
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = this.comments.find((comment) =>
      comment.id.equals(new UniqueId(id)),
    )
    return comment ?? null
  }

  async delete(id: string): Promise<void> {
    this.comments = this.comments.filter(
      (comment) => !comment.id.equals(new UniqueId(id)),
    )
  }
}
