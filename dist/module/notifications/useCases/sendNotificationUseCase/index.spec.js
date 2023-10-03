"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const _1 = require(".");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let sut;
describe('Send Notification', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        sut = new _1.SendNotificationUseCase(notificationsRepository);
    });
    it('should be able to send an new notification', async () => {
        const response = await sut.execute({
            content: 'content',
            recipientId: 'user-id',
            title: 'new notification',
        });
        expect(response.isRight()).toEqual(true);
        expect(notificationsRepository.notifications[0].content).toEqual('content');
    });
});
//# sourceMappingURL=index.spec.js.map