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
import { Injectable } from '@infra/containers/Injectable';
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { left, right } from '@shared/core/errors/Either';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
import { inject, injectable } from 'tsyringe';
let DeleteCommentUseCase = class DeleteCommentUseCase {
    constructor(topicsRepository, commentsRepository, usersRepository) {
        this.topicsRepository = topicsRepository;
        this.commentsRepository = commentsRepository;
        this.usersRepository = usersRepository;
    }
    async execute({ topicId, authorId, commentId }) {
        const userExists = await this.usersRepository.findById(authorId);
        if (!userExists) {
            return left(new UserNotFoundError());
        }
        const topicExists = await this.topicsRepository.findById(topicId);
        if (!topicExists) {
            return left(new TopicNotFoundError());
        }
        const commentExists = await this.commentsRepository.findById(commentId);
        if (!commentExists) {
            return left(new CommentNotFoundError());
        }
        if (!commentExists.authorId.equals(userExists.id)) {
            return left(new PermissionDeniedError());
        }
        await this.commentsRepository.delete(commentId);
        return right(null);
    }
};
DeleteCommentUseCase = __decorate([
    injectable(),
    __param(0, inject(Injectable.Repositories.Topics)),
    __param(1, inject(Injectable.Repositories.Comments)),
    __param(2, inject(Injectable.Repositories.Users)),
    __metadata("design:paramtypes", [TopicsRepository,
        CommentsRepository,
        UsersRepository])
], DeleteCommentUseCase);
export { DeleteCommentUseCase };
//# sourceMappingURL=index.js.map