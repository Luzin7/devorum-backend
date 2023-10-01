import { Notification } from '@module/notifications/entities/Notification'
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository'

export class NotificationsInMemoryRepository
  implements NotificationsRepository
{
  notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id.toString() === id,
    )

    if (!notification) return null

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex((n) =>
      n.id.equals(notification.id),
    )

    if (notificationIndex < 0) {
      throw new Error('Notification not created')
    }

    this.notifications[notificationIndex] = notification
  }
}
