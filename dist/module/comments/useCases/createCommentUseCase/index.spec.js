"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const UserNotFoundError_1 = require("@module/users/errors/UserNotFoundError");
const _1 = require(".");
const makeTopic_1 = require("@test/module/topic/factories/makeTopic");
const CommentsInMemoryRepository_1 = require("@test/module/comment/repositories/CommentsInMemoryRepository");
const TopicNotFoundError_1 = require("@module/topics/errors/TopicNotFoundError");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let topicsRepository;
let usersRepository;
let commentsRepository;
let sut;
describe('create comment', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        commentsRepository = new CommentsInMemoryRepository_1.CommentsInMemoryRepository();
        sut = new _1.CreateCommentUseCase(topicsRepository, commentsRepository, usersRepository);
    });
    it('should be able to create an new comment', async () => {
        const user = (0, makeUser_1.makeUser)();
        const topic = (0, makeTopic_1.makeTopic)({ authorId: user.id });
        usersRepository.create(user);
        topicsRepository.create(topic);
        const response = await sut.execute({
            content: 'content',
            authorId: user.id.toString(),
            topicId: topic.id.toString(),
        });
        expect(response.isRight()).toEqual(true);
        expect(commentsRepository.comments[0].content).toEqual('content');
        expect(commentsRepository.comments[0].authorId.toString()).toEqual(user.id.toString());
        expect(commentsRepository.comments[0].topicId.toString()).toEqual(topic.id.toString());
    });
    it('not should be able to create an new comment if user doesnt exists', async () => {
        const topic = (0, makeTopic_1.makeTopic)();
        topicsRepository.create(topic);
        const response = await sut.execute({
            content: 'content',
            authorId: 'non-existent-user-id',
            topicId: topic.id.toString(),
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserNotFoundError_1.UserNotFoundError);
    });
    it('not should be able to create an new comment if topic doesnt exists', async () => {
        const user = (0, makeUser_1.makeUser)();
        usersRepository.create(user);
        const response = await sut.execute({
            content: 'content',
            authorId: user.id.toString(),
            topicId: 'non-existent-topic-id',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(TopicNotFoundError_1.TopicNotFoundError);
    });
});
//# sourceMappingURL=index.spec.js.map