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
exports.SendNotificationUseCase = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const Notification_1 = require("@module/notifications/entities/Notification");
const NotificationsRepository_1 = require("@module/notifications/repositories/contracts/NotificationsRepository");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const Either_1 = require("@shared/core/errors/Either");
const tsyringe_1 = require("tsyringe");
let SendNotificationUseCase = class SendNotificationUseCase {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async execute({ content, recipientId, title }) {
        const notification = Notification_1.Notification.create({
            content,
            recipientId: new UniqueId_1.UniqueId(recipientId),
            title,
        });
        await this.notificationRepository.create(notification);
        return (0, Either_1.right)({
            notification,
        });
    }
};
exports.SendNotificationUseCase = SendNotificationUseCase;
exports.SendNotificationUseCase = SendNotificationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Notifications)),
    __metadata("design:paramtypes", [NotificationsRepository_1.NotificationsRepository])
], SendNotificationUseCase);
//# sourceMappingURL=index.js.map