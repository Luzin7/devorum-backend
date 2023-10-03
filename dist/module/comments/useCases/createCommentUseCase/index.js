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
exports.CreateCommentUseCase = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const Comment_1 = require("@module/comments/entities/Comment");
const CommentsRepository_1 = require("@module/comments/repositories/contracts/CommentsRepository");
const TopicNotFoundError_1 = require("@module/topics/errors/TopicNotFoundError");
const TopicsRepository_1 = require("@module/topics/repositories/contracts/TopicsRepository");
const UserNotFoundError_1 = require("@module/users/errors/UserNotFoundError");
const UsersRepository_1 = require("@module/users/repositories/contracts/UsersRepository");
const Either_1 = require("@shared/core/errors/Either");
const tsyringe_1 = require("tsyringe");
let CreateCommentUseCase = class CreateCommentUseCase {
    constructor(topicsRepository, commentsRepository, usersRepository) {
        this.topicsRepository = topicsRepository;
        this.commentsRepository = commentsRepository;
        this.usersRepository = usersRepository;
    }
    async execute({ content, authorId, topicId }) {
        const userExists = await this.usersRepository.findById(authorId);
        if (!userExists) {
            return (0, Either_1.left)(new UserNotFoundError_1.UserNotFoundError());
        }
        const topicExists = await this.topicsRepository.findById(topicId);
        if (!topicExists) {
            return (0, Either_1.left)(new TopicNotFoundError_1.TopicNotFoundError());
        }
        const comment = Comment_1.Comment.create({
            content,
            authorId: userExists.id,
            topicId: topicExists.id,
        });
        await this.commentsRepository.create(comment);
        return (0, Either_1.right)({ comment });
    }
};
exports.CreateCommentUseCase = CreateCommentUseCase;
exports.CreateCommentUseCase = CreateCommentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Topics)),
    __param(1, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Comments)),
    __param(2, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Users)),
    __metadata("design:paramtypes", [TopicsRepository_1.TopicsRepository,
        CommentsRepository_1.CommentsRepository,
        UsersRepository_1.UsersRepository])
], CreateCommentUseCase);
//# sourceMappingURL=index.js.map