import { SendNotificationUseCase } from '@module/notifications/useCases/sendNotificationUseCase';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { EventHandler } from '@shared/core/events/EventHandler';
export declare class OnCommentCreated implements EventHandler {
    private topicsRepository;
    private sendNotificationUseCase;
    constructor(topicsRepository: TopicsRepository, sendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendNewCommentNotification;
}
