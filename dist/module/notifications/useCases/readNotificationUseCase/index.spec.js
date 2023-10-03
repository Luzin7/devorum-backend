"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const _1 = require(".");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const NotificationNotFoundError_1 = require("@module/notifications/errors/NotificationNotFoundError");
const PermissionDeniedError_1 = require("@shared/errors/PermissionDeniedError");
const makeNotification_1 = require("@test/module/notification/factories/makeNotification");
let notificationsRepository;
let sut;
describe('read Notification', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        sut = new _1.ReadNotificationUseCase(notificationsRepository);
    });
    it('should be able to read a notification', async () => {
        const notification = (0, makeNotification_1.makeNotification)({
            recipientId: new UniqueId_1.UniqueId('user-id'),
        });
        notificationsRepository.create(notification);
        const response = await sut.execute({
            recipientId: 'user-id',
            notificationId: notification.id.toString(),
        });
        expect(response.isRight()).toEqual(true);
        expect(notificationsRepository.notifications[0].readAt).toBeInstanceOf(Date);
    });
    it('not should be able to read a unixistent notification', async () => {
        const response = await sut.execute({
            recipientId: 'user-id',
            notificationId: 'unixistent-notification-id',
        });
        expect(response.isRight()).toEqual(false);
        expect(response.value).toBeInstanceOf(NotificationNotFoundError_1.NotificationNotFoundError);
    });
    it('not should be able to read a notification of another user', async () => {
        const notification = (0, makeNotification_1.makeNotification)({
            recipientId: new UniqueId_1.UniqueId('user-id-2'),
        });
        notificationsRepository.create(notification);
        const response = await sut.execute({
            recipientId: 'user-id',
            notificationId: notification.id.toString(),
        });
        expect(response.isRight()).toEqual(false);
        expect(response.value).toBeInstanceOf(PermissionDeniedError_1.PermissionDeniedError);
    });
});
//# sourceMappingURL=index.spec.js.map