import { Notification } from '@module/notifications/entities/Notification'
import { Notification as NotificationPrisma, Prisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class NotificationsPrismaMapper {
  static toEntity(raw: NotificationPrisma): Notification {
    return Notification.create(
      {
        content: raw.content,
        title: raw.title,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        recipientId: new UniqueId(raw.recipientId),
      },
      new UniqueId(raw.id),
    )
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      content: notification.content,
      title: notification.title,
      createdAt: notification.createdAt,
      id: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
      readAt: notification.readAt,
    }
  }
}
