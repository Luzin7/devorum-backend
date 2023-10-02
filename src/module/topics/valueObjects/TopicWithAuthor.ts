import { UniqueId } from '@shared/core/entities/UniqueId'
import { ValueObject } from '@shared/core/entities/ValueObject'
import { Optional } from '@shared/core/types/optional'

interface TopicWithAuthorProps {
  topicId: UniqueId
  authorId: UniqueId
  authorName: string
  content: string
  topicCreatedAt: Date
  topicUpdatedAt: Date | null
  numberOfComments: number
}

export class TopicWithAuthor extends ValueObject<TopicWithAuthorProps> {
  static create(props: Optional<TopicWithAuthorProps, 'numberOfComments'>) {
    return new TopicWithAuthor({
      ...props,
      numberOfComments: props.numberOfComments ?? 0,
    })
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
}
