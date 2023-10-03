"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithNotificationsPresenter = void 0;
const notificationPresenter_1 = require("@module/notifications/presenters/notificationPresenter");
class UserWithNotificationsPresenter {
    static toHTTP(userWhitNotifications) {
        return {
            userId: userWhitNotifications.userId.toString(),
            name: userWhitNotifications.name,
            email: userWhitNotifications.email,
            notifications: userWhitNotifications.notifications.map(notificationPresenter_1.NotificationPresenter.toHTTP),
        };
    }
}
exports.UserWithNotificationsPresenter = UserWithNotificationsPresenter;
//# sourceMappingURL=userWithNotificationsPresenter.js.map