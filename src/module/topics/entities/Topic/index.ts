import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'
import { TopicCommentsList } from '../TopicCommentsList'

export interface TopicProps {
  authorId: UniqueId
  title: string
  content: string
  createdAt: Date
  updatedAt: Date | null
  comments: TopicCommentsList
}

export class Topic extends AggregateRoot<TopicProps> {
  static create(
    props: Optional<TopicProps, 'updatedAt' | 'createdAt' | 'comments'>,
    id?: UniqueId,
  ) {
    const topicProps: TopicProps = {
      authorId: props.authorId,
      createdAt: props.createdAt ?? new Date(),
      title: props.title,
      content: props.content,
      updatedAt: props.updatedAt ?? null,
      comments: props.comments ?? new TopicCommentsList(),
    }

    const topic = new Topic(topicProps, id)

    return topic
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get comments() {
    return this.props.comments
  }
}
