import { prisma } from '@infra/database/createConnection';
import { NotificationsPrismaMapper } from './notificationsPrismaMapper';
export class NotificationsPrismaRepository {
    async create(notification) {
        await prisma.notification.create({
            data: NotificationsPrismaMapper.toPrisma(notification),
        });
    }
    async findById(id) {
        const notification = await prisma.notification.findUnique({
            where: {
                id,
            },
        });
        if (!notification)
            return null;
        return NotificationsPrismaMapper.toEntity(notification);
    }
    async save(notification) {
        await prisma.notification.update({
            where: {
                id: notification.id.toString(),
            },
            data: NotificationsPrismaMapper.toPrisma(notification),
        });
    }
}
//# sourceMappingURL=notificationsPrismaRepository.js.map