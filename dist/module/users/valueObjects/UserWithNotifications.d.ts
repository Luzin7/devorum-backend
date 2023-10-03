import { Notification } from '@module/notifications/entities/Notification';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { ValueObject } from '@shared/core/entities/ValueObject';
interface UserWithNotificationsProps {
    userId: UniqueId;
    name: string;
    email: string;
    notifications: Notification[];
}
export declare class UserWithNotifications extends ValueObject<UserWithNotificationsProps> {
    static create(props: UserWithNotificationsProps): UserWithNotifications;
    get userId(): UniqueId;
    get name(): string;
    get email(): string;
    get notifications(): Notification[];
}
export {};
