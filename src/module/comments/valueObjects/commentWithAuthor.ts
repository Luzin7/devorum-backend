import { UniqueId } from '@shared/core/entities/UniqueId'
import { ValueObject } from '@shared/core/entities/ValueObject'

interface CommentWithAuthorProps {
  commentId: UniqueId
  authorId: UniqueId
  authorName: string
  commentContent: string
  commentCreatedAt: Date
  commentUpdatedAt: Date | null
}

export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor({
      ...props,
    })
  }

  get commentId() {
    return this.props.commentId
  }

  get authorId() {
    return this.props.authorId
  }

  get commentContent() {
    return this.props.commentContent
  }

  get commentCreatedAt() {
    return this.props.commentCreatedAt
  }

  get commentUpdatedAt() {
    return this.props.commentUpdatedAt
  }

  get authorName() {
    return this.props.authorName
  }
}
