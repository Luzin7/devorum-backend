import { Notification } from '@module/notifications/entities/Notification'

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>
}
