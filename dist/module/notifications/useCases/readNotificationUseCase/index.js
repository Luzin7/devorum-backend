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
exports.ReadNotificationUseCase = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const NotificationNotFoundError_1 = require("@module/notifications/errors/NotificationNotFoundError");
const NotificationsRepository_1 = require("@module/notifications/repositories/contracts/NotificationsRepository");
const Either_1 = require("@shared/core/errors/Either");
const PermissionDeniedError_1 = require("@shared/errors/PermissionDeniedError");
const tsyringe_1 = require("tsyringe");
let ReadNotificationUseCase = class ReadNotificationUseCase {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async execute({ recipientId, notificationId }) {
        const notification = await this.notificationRepository.findById(notificationId);
        if (!notification) {
            return (0, Either_1.left)(new NotificationNotFoundError_1.NotificationNotFoundError());
        }
        if (notification.recipientId.toString() !== recipientId) {
            return (0, Either_1.left)(new PermissionDeniedError_1.PermissionDeniedError());
        }
        notification.read();
        await this.notificationRepository.save(notification);
        return (0, Either_1.right)({
            notification,
        });
    }
};
exports.ReadNotificationUseCase = ReadNotificationUseCase;
exports.ReadNotificationUseCase = ReadNotificationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Notifications)),
    __metadata("design:paramtypes", [NotificationsRepository_1.NotificationsRepository])
], ReadNotificationUseCase);
//# sourceMappingURL=index.js.map