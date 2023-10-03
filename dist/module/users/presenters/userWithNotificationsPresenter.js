import { NotificationPresenter } from '@module/notifications/presenters/notificationPresenter';
export class UserWithNotificationsPresenter {
    static toHTTP(userWhitNotifications) {
        return {
            userId: userWhitNotifications.userId.toString(),
            name: userWhitNotifications.name,
            email: userWhitNotifications.email,
            notifications: userWhitNotifications.notifications.map(NotificationPresenter.toHTTP),
        };
    }
}
//# sourceMappingURL=userWithNotificationsPresenter.js.map