import { Notification } from '@module/notifications/entities/Notification';
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    title: string;
    content: string;
    recipientId: string;
}
type Response = Either<null, {
    notification: Notification;
}>;
export declare class SendNotificationUseCase implements UseCase<Request, Response> {
    private readonly notificationRepository;
    constructor(notificationRepository: NotificationsRepository);
    execute({ content, recipientId, title }: Request): Promise<Response>;
}
export {};
