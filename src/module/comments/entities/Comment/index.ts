import { CommentCreatedEvent } from '@module/comments/events/CommentCreatedEvent'
import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

export interface CommentProps {
  topicId: UniqueId
  authorId: UniqueId
  content: string
  createdAt: Date
  updatedAt: Date | null
  isDeleted: boolean
}

export class Comment extends AggregateRoot<CommentProps> {
  static create(
    props: Optional<CommentProps, 'createdAt' | 'updatedAt' | 'isDeleted'>,
    id?: UniqueId,
  ) {
    const commentProps: CommentProps = {
      topicId: props.topicId,
      authorId: props.authorId,
      content: props.content,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      isDeleted: props.isDeleted ?? false,
    }

    const comment = new Comment(commentProps, id)
    const isNewComment = !id

    if (isNewComment) {
      comment.addDomainEvent(new CommentCreatedEvent(comment))
    }

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

  set content(content: string) {
    if (!content) {
      return
    }

    this.props.content = content
    this.update()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  update() {
    this.props.updatedAt = new Date()
  }

  get isDeleted() {
    return this.props.isDeleted
  }

  set isDeleted(value: boolean) {
    this.props.isDeleted = value
  }
}
