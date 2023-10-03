"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const makeTopic_1 = require("@test/module/topic/factories/makeTopic");
const CommentsInMemoryRepository_1 = require("@test/module/comment/repositories/CommentsInMemoryRepository");
const makeComment_1 = require("@test/module/comment/factories/makeComment");
const _1 = require(".");
const CommentNotFoundError_1 = require("@module/comments/errors/CommentNotFoundError");
const PermissionDeniedError_1 = require("@shared/errors/PermissionDeniedError");
const CommentNotCanBeUpdatedError_1 = require("@module/comments/errors/CommentNotCanBeUpdatedError");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let topicsRepository;
let usersRepository;
let commentsRepository;
let sut;
describe('update comment', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        commentsRepository = new CommentsInMemoryRepository_1.CommentsInMemoryRepository();
        sut = new _1.UpdateCommentUseCase(commentsRepository);
    });
    it('should be able to update a comment', async () => {
        const user = (0, makeUser_1.makeUser)();
        const topic = (0, makeTopic_1.makeTopic)();
        const comment = (0, makeComment_1.makeComment)({
            topicId: topic.id,
            authorId: user.id,
            content: 'Initial content',
        });
        usersRepository.create(user);
        topicsRepository.create(topic);
        commentsRepository.create(comment);
        const response = await sut.execute({
            authorId: user.id.toString(),
            commentId: comment.id.toString(),
            content: 'New content',
        });
        expect(response.isRight()).toEqual(true);
        expect(commentsRepository.comments[0].content).toEqual('New content');
        expect(commentsRepository.comments[0].updatedAt).toBeInstanceOf(Date);
    });
    it('not should be able to update a comment if comment doesnt exists', async () => {
        const user = (0, makeUser_1.makeUser)();
        const response = await sut.execute({
            authorId: user.id.toString(),
            commentId: 'unixistent-comment-id',
            content: 'A new content',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(CommentNotFoundError_1.CommentNotFoundError);
    });
    it('not should be able to update a comment if comment are of another user', async () => {
        const user = (0, makeUser_1.makeUser)();
        const user2 = (0, makeUser_1.makeUser)();
        const topic = (0, makeTopic_1.makeTopic)();
        const comment = (0, makeComment_1.makeComment)({
            topicId: topic.id,
            authorId: user.id,
            content: 'Initial content',
        });
        usersRepository.create(user);
        usersRepository.create(user2);
        topicsRepository.create(topic);
        commentsRepository.create(comment);
        const response = await sut.execute({
            authorId: user2.id.toString(),
            commentId: comment.id.toString(),
            content: 'A new content',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(PermissionDeniedError_1.PermissionDeniedError);
    });
    it('not should be able to update a comment if nothing are updated', async () => {
        const user = (0, makeUser_1.makeUser)();
        const topic = (0, makeTopic_1.makeTopic)();
        const comment = (0, makeComment_1.makeComment)({
            topicId: topic.id,
            authorId: user.id,
            content: 'Initial content',
        });
        usersRepository.create(user);
        topicsRepository.create(topic);
        commentsRepository.create(comment);
        const response = await sut.execute({
            authorId: user.id.toString(),
            commentId: comment.id.toString(),
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(CommentNotCanBeUpdatedError_1.CommentNotCanBeUpdatedError);
    });
});
//# sourceMappingURL=index.spec.js.map