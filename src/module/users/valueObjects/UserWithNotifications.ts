import { Notification } from '@module/notifications/entities/Notification'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { ValueObject } from '@shared/core/entities/ValueObject'

interface UserWithNotificationsProps {
  userId: UniqueId
  name: string
  email: string
  notifications: Notification[]
}

export class UserWithNotifications extends ValueObject<UserWithNotificationsProps> {
  static create(props: UserWithNotificationsProps) {
    return new UserWithNotifications(props)
  }

  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get notifications() {
    return this.props.notifications
  }
}
