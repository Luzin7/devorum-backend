"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const _1 = require(".");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const UserNotFoundError_1 = require("@module/users/errors/UserNotFoundError");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let topicsRepository;
let usersRepository;
let sut;
describe('create topic', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        sut = new _1.CreateTopicUseCase(topicsRepository, usersRepository);
    });
    it('should be able to create an new topic', async () => {
        const user = (0, makeUser_1.makeUser)({}, new UniqueId_1.UniqueId('user-1'));
        usersRepository.create(user);
        const response = await sut.execute({
            content: 'content',
            authorId: 'user-1',
            title: 'title',
        });
        expect(response.isRight()).toEqual(true);
        expect(topicsRepository.topics[0].content).toEqual('content');
        expect(topicsRepository.topics[0].authorId.toString()).toEqual('user-1');
    });
    it('not should be able to create an new topic if user doesnt exists', async () => {
        const response = await sut.execute({
            content: 'content',
            authorId: 'non-existent-user-id',
            title: 'title',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserNotFoundError_1.UserNotFoundError);
    });
});
//# sourceMappingURL=index.spec.js.map