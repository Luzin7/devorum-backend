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
import { NotificationNotFoundError } from '@module/notifications/errors/NotificationNotFoundError';
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository';
import { left, right } from '@shared/core/errors/Either';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
import { inject, injectable } from 'tsyringe';
let ReadNotificationUseCase = class ReadNotificationUseCase {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async execute({ recipientId, notificationId }) {
        const notification = await this.notificationRepository.findById(notificationId);
        if (!notification) {
            return left(new NotificationNotFoundError());
        }
        if (notification.recipientId.toString() !== recipientId) {
            return left(new PermissionDeniedError());
        }
        notification.read();
        await this.notificationRepository.save(notification);
        return right({
            notification,
        });
    }
};
ReadNotificationUseCase = __decorate([
    injectable(),
    __param(0, inject(Injectable.Repositories.Notifications)),
    __metadata("design:paramtypes", [NotificationsRepository])
], ReadNotificationUseCase);
export { ReadNotificationUseCase };
//# sourceMappingURL=index.js.map