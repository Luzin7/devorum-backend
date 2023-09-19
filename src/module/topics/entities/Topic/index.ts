import { Entity } from '@shared/core/entities/Entity'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

interface TopicProps {
  authorId: UniqueId
  authorName: string
  title: string
  createdAt: Date
  updatedAt: Date | null
}

export class Topic extends Entity<TopicProps> {
  static create(
    props: Optional<TopicProps, 'updatedAt' | 'createdAt'>,
    id?: UniqueId,
  ) {
    const topicProps: TopicProps = {
      authorId: props.authorId,
      authorName: props.authorName,
      createdAt: props.createdAt ?? new Date(),
      title: props.title,
      updatedAt: props.updatedAt ?? null,
    }

    const topic = new Topic(topicProps, id)

    return topic
  }

  get authorId() {
    return this.props.createdAt
  }

  get authorName() {
    return this.props.createdAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get title() {
    return this.props.title
  }

  get updatedAt() {
    return this.props.createdAt
  }
}
