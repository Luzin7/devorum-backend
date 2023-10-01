import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications'
import {
  User as UserPrisma,
  Notification as NotificationPrisma,
} from '@prisma/client'
import { NotificationsPrismaMapper } from '../notifications/notificationsPrismaMapper'
import { UniqueId } from '@shared/core/entities/UniqueId'

type UserWithNotificationsPrisma = UserPrisma & {
  notifications: NotificationPrisma[]
}

export class UsersWithNotificationsPrismaMapper {
  static toEntity(raw: UserWithNotificationsPrisma): UserWithNotifications {
    return UserWithNotifications.create({
      email: raw.email,
      name: raw.name,
      notifications: raw.notifications.map(NotificationsPrismaMapper.toEntity),
      userId: new UniqueId(raw.id),
    })
  }
}
