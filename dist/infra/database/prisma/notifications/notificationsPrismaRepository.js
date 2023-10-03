"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsPrismaRepository = void 0;
const createConnection_1 = require("@infra/database/createConnection");
const notificationsPrismaMapper_1 = require("./notificationsPrismaMapper");
class NotificationsPrismaRepository {
    async create(notification) {
        await createConnection_1.prisma.notification.create({
            data: notificationsPrismaMapper_1.NotificationsPrismaMapper.toPrisma(notification),
        });
    }
    async findById(id) {
        const notification = await createConnection_1.prisma.notification.findUnique({
            where: {
                id,
            },
        });
        if (!notification)
            return null;
        return notificationsPrismaMapper_1.NotificationsPrismaMapper.toEntity(notification);
    }
    async save(notification) {
        await createConnection_1.prisma.notification.update({
            where: {
                id: notification.id.toString(),
            },
            data: notificationsPrismaMapper_1.NotificationsPrismaMapper.toPrisma(notification),
        });
    }
}
exports.NotificationsPrismaRepository = NotificationsPrismaRepository;
//# sourceMappingURL=notificationsPrismaRepository.js.map