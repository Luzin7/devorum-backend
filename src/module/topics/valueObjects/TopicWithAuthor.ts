import { UniqueId } from '@shared/core/entities/UniqueId'
import { ValueObject } from '@shared/core/entities/ValueObject'

interface TopicWithAuthorProps {
  topicId: UniqueId
  authorId: UniqueId
  authorName: string
  content: string
  topicCreatedAt: Date
  topicUpdatedAt: Date | null
}

export class TopicWithAuthor extends ValueObject<TopicWithAuthorProps> {
  static create(props: TopicWithAuthorProps) {
    return new TopicWithAuthor(props)
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
}
