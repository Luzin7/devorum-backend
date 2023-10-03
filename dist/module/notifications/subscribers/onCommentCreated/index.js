var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@infra/containers/Injectable';
import { CommentCreatedEvent } from '@module/comments/events/CommentCreatedEvent';
import { SendNotificationUseCase } from '@module/notifications/useCases/sendNotificationUseCase';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { DomainEvents } from '@shared/core/events/DomainEvents';
import { container, inject, injectable } from 'tsyringe';
let OnCommentCreated = class OnCommentCreated {
    constructor(topicsRepository, sendNotificationUseCase) {
        this.topicsRepository = topicsRepository;
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        DomainEvents.register(CommentCreatedEvent.name, this.sendNewCommentNotification.bind(this));
    }
    async sendNewCommentNotification({ comment }) {
        if (!this.sendNotificationUseCase) {
            this.sendNotificationUseCase = container.resolve(SendNotificationUseCase);
        }
        const topic = await this.topicsRepository.findById(comment.topicId.toString());
        if (topic) {
            await this.sendNotificationUseCase.execute({
                recipientId: topic.authorId.toString(),
                title: `Um novo comentário foi criado em ${topic.title
                    .substring(0, 40)
                    .concat('...')}`,
                content: `${comment.content.substring(0, 120).concat('...')}`,
            });
        }
    }
};
OnCommentCreated = __decorate([
    injectable(),
    __param(0, inject(Injectable.Repositories.Topics)),
    __metadata("design:paramtypes", [TopicsRepository,
        SendNotificationUseCase])
], OnCommentCreated);
export { OnCommentCreated };
//# sourceMappingURL=index.js.map