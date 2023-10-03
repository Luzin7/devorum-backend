"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsPrismaMapper = void 0;
const Notification_1 = require("@module/notifications/entities/Notification");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class NotificationsPrismaMapper {
    static toEntity(raw) {
        return Notification_1.Notification.create({
            content: raw.content,
            title: raw.title,
            createdAt: raw.createdAt,
            readAt: raw.readAt,
            recipientId: new UniqueId_1.UniqueId(raw.recipientId),
        }, new UniqueId_1.UniqueId(raw.id));
    }
    static toPrisma(notification) {
        return {
            content: notification.content,
            title: notification.title,
            createdAt: notification.createdAt,
            id: notification.id.toString(),
            recipientId: notification.recipientId.toString(),
            readAt: notification.readAt,
        };
    }
}
exports.NotificationsPrismaMapper = NotificationsPrismaMapper;
//# sourceMappingURL=notificationsPrismaMapper.js.map