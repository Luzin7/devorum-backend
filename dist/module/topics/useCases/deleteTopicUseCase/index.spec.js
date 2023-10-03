"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const _1 = require(".");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const UserNotFoundError_1 = require("@module/users/errors/UserNotFoundError");
const makeTopic_1 = require("@test/module/topic/factories/makeTopic");
const TopicNotFoundError_1 = require("@module/topics/errors/TopicNotFoundError");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let topicsRepository;
let usersRepository;
let sut;
describe('delete topic', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        sut = new _1.DeleteTopicUseCase(topicsRepository, usersRepository);
    });
    it('should be able to delete a topic', async () => {
        const user = (0, makeUser_1.makeUser)({}, new UniqueId_1.UniqueId('user-1'));
        const topic = (0, makeTopic_1.makeTopic)({ authorId: user.id }, new UniqueId_1.UniqueId('topic-1'));
        usersRepository.create(user);
        topicsRepository.create(topic);
        const response = await sut.execute({
            topicId: 'topic-1',
            authorId: 'user-1',
        });
        expect(response.isRight()).toEqual(true);
        expect(topicsRepository.topics.length).toEqual(0);
    });
    it('not should be able to delete a topic if user doesnt exists', async () => {
        const topic = (0, makeTopic_1.makeTopic)({}, new UniqueId_1.UniqueId('topic-1'));
        topicsRepository.create(topic);
        const response = await sut.execute({
            topicId: 'topic-1',
            authorId: 'non-existent-user-id',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserNotFoundError_1.UserNotFoundError);
    });
    it('not should be able to delete a topic if it doesnt exists', async () => {
        const user = (0, makeUser_1.makeUser)({}, new UniqueId_1.UniqueId('user-1'));
        usersRepository.create(user);
        const response = await sut.execute({
            topicId: 'non-existent-topic-id',
            authorId: 'user-1',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(TopicNotFoundError_1.TopicNotFoundError);
    });
});
//# sourceMappingURL=index.spec.js.map