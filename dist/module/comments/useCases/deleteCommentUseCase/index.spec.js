"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const UserNotFoundError_1 = require("@module/users/errors/UserNotFoundError");
const makeTopic_1 = require("@test/module/topic/factories/makeTopic");
const CommentsInMemoryRepository_1 = require("@test/module/comment/repositories/CommentsInMemoryRepository");
const TopicNotFoundError_1 = require("@module/topics/errors/TopicNotFoundError");
const _1 = require(".");
const makeComment_1 = require("@test/module/comment/factories/makeComment");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let topicsRepository;
let usersRepository;
let commentsRepository;
let sut;
describe('delete comment', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        commentsRepository = new CommentsInMemoryRepository_1.CommentsInMemoryRepository();
        sut = new _1.DeleteCommentUseCase(topicsRepository, commentsRepository, usersRepository);
    });
    it('should be able to delete a comment', async () => {
        const user = (0, makeUser_1.makeUser)();
        const topic = (0, makeTopic_1.makeTopic)({ authorId: user.id });
        const comment = (0, makeComment_1.makeComment)({ topicId: topic.id, authorId: user.id });
        usersRepository.create(user);
        topicsRepository.create(topic);
        commentsRepository.create(comment);
        const response = await sut.execute({
            authorId: user.id.toString(),
            topicId: topic.id.toString(),
            commentId: comment.id.toString(),
        });
        expect(response.isRight()).toEqual(true);
        expect(commentsRepository.comments.length).toEqual(0);
    });
    it('not should be able to delete a comment if user doesnt exists', async () => {
        const topic = (0, makeTopic_1.makeTopic)();
        const comment = (0, makeComment_1.makeComment)({ topicId: topic.id });
        commentsRepository.create(comment);
        topicsRepository.create(topic);
        const response = await sut.execute({
            authorId: 'unixistent-user-id',
            topicId: topic.id.toString(),
            commentId: comment.id.toString(),
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserNotFoundError_1.UserNotFoundError);
    });
    it('not should be able to delete a comment if topic doesnt exists', async () => {
        const user = (0, makeUser_1.makeUser)();
        const comment = (0, makeComment_1.makeComment)({ authorId: user.id });
        commentsRepository.create(comment);
        usersRepository.create(user);
        const response = await sut.execute({
            authorId: user.id.toString(),
            topicId: 'unixistent-topic-id',
            commentId: comment.id.toString(),
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(TopicNotFoundError_1.TopicNotFoundError);
    });
});
//# sourceMappingURL=index.spec.js.map