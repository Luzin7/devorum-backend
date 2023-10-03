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
import { CommentNotCanBeUpdatedError } from '@module/comments/errors/CommentNotCanBeUpdatedError';
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
import { left, right } from '@shared/core/errors/Either';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
import { inject, injectable } from 'tsyringe';
let UpdateCommentUseCase = class UpdateCommentUseCase {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async execute({ authorId, commentId, content }) {
        const comment = await this.commentsRepository.findById(commentId);
        if (!comment) {
            return left(new CommentNotFoundError());
        }
        if (comment.authorId.toString() !== authorId) {
            return left(new PermissionDeniedError());
        }
        if (!content) {
            return left(new CommentNotCanBeUpdatedError());
        }
        comment.content = content;
        await this.commentsRepository.save(comment);
        return right({
            comment,
        });
    }
};
UpdateCommentUseCase = __decorate([
    injectable(),
    __param(0, inject(Injectable.Repositories.Comments)),
    __metadata("design:paramtypes", [CommentsRepository])
], UpdateCommentUseCase);
export { UpdateCommentUseCase };
//# sourceMappingURL=index.js.map