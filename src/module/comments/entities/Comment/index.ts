import { Entity } from '@shared/core/entities/Entity'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

export interface CommentProps {
  topicId: UniqueId
  authorId: UniqueId
  authorName: string
  content: string
  createdAt: Date
  updatedAt: Date | null
}

export class Comment extends Entity<CommentProps> {
  static create(
    props: Optional<CommentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId,
  ) {
    const commentProps: CommentProps = {
      topicId: props.topicId,
      authorId: props.authorId,
      authorName: props.authorName,
      content: props.content,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const comment = new Comment(commentProps, id)

    return comment
  }

  get topicId() {
    return this.props.topicId
  }

  get authorId() {
    return this.props.authorId
  }

  get authorName() {
    return this.props.authorName
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
