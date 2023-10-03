"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWithNotificationsPrismaMapper = void 0;
const UserWithNotifications_1 = require("@module/users/valueObjects/UserWithNotifications");
const notificationsPrismaMapper_1 = require("../notifications/notificationsPrismaMapper");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class UsersWithNotificationsPrismaMapper {
    static toEntity(raw) {
        return UserWithNotifications_1.UserWithNotifications.create({
            email: raw.email,
            name: raw.name,
            notifications: raw.notifications.map(notificationsPrismaMapper_1.NotificationsPrismaMapper.toEntity),
            userId: new UniqueId_1.UniqueId(raw.id),
        });
    }
}
exports.UsersWithNotificationsPrismaMapper = UsersWithNotificationsPrismaMapper;
//# sourceMappingURL=UsersWithNotificationsPrismaMapper.js.map