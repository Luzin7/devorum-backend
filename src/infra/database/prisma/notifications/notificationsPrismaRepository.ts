import { prisma } from '@infra/database/createConnection'
import { Notification } from '@module/notifications/entities/Notification'
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository'
import { NotificationsPrismaMapper } from './notificationsPrismaMapper'

export class NotificationsPrismaRepository implements NotificationsRepository {
  async create(notification: Notification): Promise<void> {
    await prisma.notification.create({
      data: NotificationsPrismaMapper.toPrisma(notification),
    })
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await prisma.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notification) return null

    return NotificationsPrismaMapper.toEntity(notification)
  }

  async save(notification: Notification): Promise<void> {
    await prisma.notification.update({
      where: {
        id: notification.id.toString(),
      },
      data: NotificationsPrismaMapper.toPrisma(notification),
    })
  }
}
