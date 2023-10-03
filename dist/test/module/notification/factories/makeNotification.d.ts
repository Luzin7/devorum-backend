import { Notification, NotificationProps } from '@module/notifications/entities/Notification';
import { UniqueId } from '@shared/core/entities/UniqueId';
export declare function makeNotification(override?: Partial<NotificationProps>, id?: UniqueId): Notification;
