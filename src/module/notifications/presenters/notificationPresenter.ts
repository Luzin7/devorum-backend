import { Notification } from '../entities/Notification'

export class NotificationPresenter {
  static toHTTP(notification: Notification) {
    return {
      title: notification.title,
      content: notification.content,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    }
  }
}
