import { CommentWithAuthor } from '@module/comments/valueObjects/commentWithAuthor'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { ValueObject } from '@shared/core/entities/ValueObject'
import { Optional } from '@shared/core/types/optional'

interface TopicDetailsProps {
  topicId: UniqueId
  authorId: UniqueId
  authorName: string
  topicContent: string
  topicTitle: string
  topicCreatedAt: Date
  topicUpdatedAt: Date | null
  numberOfComments: number
  topicCommentsWithAuthor: CommentWithAuthor[]
}

export class TopicDetails extends ValueObject<TopicDetailsProps> {
  static create(props: Optional<TopicDetailsProps, 'numberOfComments'>) {
    return new TopicDetails({
      ...props,
      numberOfComments: props.numberOfComments ?? 0,
    })
  }

  get topicId() {
    return this.props.topicId
  }

  get topicTitle() {
    return this.props.topicTitle
  }

  get authorId() {
    return this.props.authorId
  }

  get topicContent() {
    return this.props.topicContent
  }

  get topicCreatedAt() {
    return this.props.topicCreatedAt
  }

  get topicUpdatedAt() {
    return this.props.topicUpdatedAt
  }

  get authorName() {
    return this.props.authorName
  }

  get numberOfComments() {
    return this.props.numberOfComments
  }

  get topicCommentsWithAuthor() {
    return this.props.topicCommentsWithAuthor
  }
}
