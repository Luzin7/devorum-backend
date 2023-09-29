import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

interface NotificationProps {
  title: string
  content: string
  recipientId: UniqueId
  createdAt: Date
  readAt: Date | null
}

export class Notification extends AggregateRoot<NotificationProps> {
  static create(
    props: Optional<NotificationProps, 'createdAt' | 'readAt'>,
    id?: UniqueId,
  ) {
    const notificationProps: NotificationProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      readAt: props.readAt ?? null,
    }

    const notification = new Notification(notificationProps, id)

    return notification
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get recipientId() {
    return this.props.recipientId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get readAt() {
    return this.props.readAt
  }
}
