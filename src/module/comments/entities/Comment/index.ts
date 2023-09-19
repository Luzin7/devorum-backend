import { Entity } from '@shared/core/entities/Entity'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

interface CommentProps {
  authorId: UniqueId
  authorName: string
  comment: string
  createdAt: Date
  updatedAt: Date | null
}

export class Comment extends Entity<CommentProps> {
  static create(
    props: Optional<CommentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId,
  ) {
    const commentProps: CommentProps = {
      authorId: props.authorId,
      authorName: props.authorName,
      comment: props.comment,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const comment = new Comment(commentProps, id)

    return comment
  }

  get authorId() {
    return this.props.authorId
  }

  get authorName() {
    return this.props.authorName
  }

  get comment() {
    return this.props.comment
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
