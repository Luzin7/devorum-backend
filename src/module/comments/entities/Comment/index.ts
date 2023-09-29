import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

export interface CommentProps {
  topicId: UniqueId
  authorId: UniqueId
  content: string
  createdAt: Date
  updatedAt: Date | null
}

export class Comment extends AggregateRoot<CommentProps> {
  static create(
    props: Optional<CommentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId,
  ) {
    const commentProps: CommentProps = {
      topicId: props.topicId,
      authorId: props.authorId,
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
