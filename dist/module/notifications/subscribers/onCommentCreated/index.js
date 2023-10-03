"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnCommentCreated = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const CommentCreatedEvent_1 = require("@module/comments/events/CommentCreatedEvent");
const sendNotificationUseCase_1 = require("@module/notifications/useCases/sendNotificationUseCase");
const TopicsRepository_1 = require("@module/topics/repositories/contracts/TopicsRepository");
const DomainEvents_1 = require("@shared/core/events/DomainEvents");
const tsyringe_1 = require("tsyringe");
let OnCommentCreated = class OnCommentCreated {
    constructor(topicsRepository, sendNotificationUseCase) {
        this.topicsRepository = topicsRepository;
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        DomainEvents_1.DomainEvents.register(CommentCreatedEvent_1.CommentCreatedEvent.name, this.sendNewCommentNotification.bind(this));
    }
    async sendNewCommentNotification({ comment }) {
        if (!this.sendNotificationUseCase) {
            this.sendNotificationUseCase = tsyringe_1.container.resolve(sendNotificationUseCase_1.SendNotificationUseCase);
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
exports.OnCommentCreated = OnCommentCreated;
exports.OnCommentCreated = OnCommentCreated = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Topics)),
    __metadata("design:paramtypes", [TopicsRepository_1.TopicsRepository,
        sendNotificationUseCase_1.SendNotificationUseCase])
], OnCommentCreated);
//# sourceMappingURL=index.js.map