import { Notification } from '@module/notifications/entities/Notification';
import { NotificationNotFoundError } from '@module/notifications/errors/NotificationNotFoundError';
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
interface Request {
    recipientId: string;
    notificationId: string;
}
type Response = Either<NotificationNotFoundError | PermissionDeniedError, {
    notification: Notification;
}>;
export declare class ReadNotificationUseCase implements UseCase<Request, Response> {
    private readonly notificationRepository;
    constructor(notificationRepository: NotificationsRepository);
    execute({ recipientId, notificationId }: Request): Promise<Response>;
}
export {};
