import { NotificationPresenter } from '@module/notifications/presenters/notificationPresenter'
import { UserWithNotifications } from '../valueObjects/UserWithNotifications'

export class UserWithNotificationsPresenter {
  static toHTTP(userWhitNotifications: UserWithNotifications) {
    return {
      userId: userWhitNotifications.userId.toString(),
      name: userWhitNotifications.name,
      email: userWhitNotifications.email,
      notifications: userWhitNotifications.notifications.map(
        NotificationPresenter.toHTTP,
      ),
    }
  }
}
