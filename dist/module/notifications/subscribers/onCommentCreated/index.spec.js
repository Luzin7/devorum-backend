"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const makeComment_1 = require("@test/module/comment/factories/makeComment");
const _1 = require(".");
const CommentsInMemoryRepository_1 = require("@test/module/comment/repositories/CommentsInMemoryRepository");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const sendNotificationUseCase_1 = require("@module/notifications/useCases/sendNotificationUseCase");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
const makeTopic_1 = require("@test/module/topic/factories/makeTopic");
const waitFor_1 = require("@test/utils/waitFor");
let usersRepository;
let topicsRepository;
let commentsRepository;
let notificationsRepository;
let sendNotificationUseCase;
let sendNotificationExecuteSpy;
describe('On comment created', () => {
    beforeEach(() => {
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        commentsRepository = new CommentsInMemoryRepository_1.CommentsInMemoryRepository();
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        sendNotificationUseCase = new sendNotificationUseCase_1.SendNotificationUseCase(notificationsRepository);
        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');
        new _1.OnCommentCreated(topicsRepository, sendNotificationUseCase);
    });
    it('should send a notification when an comment is created', async () => {
        const topic = (0, makeTopic_1.makeTopic)();
        const comment = (0, makeComment_1.makeComment)({
            topicId: topic.id,
        });
        topicsRepository.create(topic);
        commentsRepository.create(comment);
        await (0, waitFor_1.waitFor)(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=index.spec.js.map