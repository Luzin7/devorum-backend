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
exports.UpdateCommentUseCase = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const CommentNotCanBeUpdatedError_1 = require("@module/comments/errors/CommentNotCanBeUpdatedError");
const CommentNotFoundError_1 = require("@module/comments/errors/CommentNotFoundError");
const CommentsRepository_1 = require("@module/comments/repositories/contracts/CommentsRepository");
const Either_1 = require("@shared/core/errors/Either");
const PermissionDeniedError_1 = require("@shared/errors/PermissionDeniedError");
const tsyringe_1 = require("tsyringe");
let UpdateCommentUseCase = class UpdateCommentUseCase {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async execute({ authorId, commentId, content }) {
        const comment = await this.commentsRepository.findById(commentId);
        if (!comment) {
            return (0, Either_1.left)(new CommentNotFoundError_1.CommentNotFoundError());
        }
        if (comment.authorId.toString() !== authorId) {
            return (0, Either_1.left)(new PermissionDeniedError_1.PermissionDeniedError());
        }
        if (!content) {
            return (0, Either_1.left)(new CommentNotCanBeUpdatedError_1.CommentNotCanBeUpdatedError());
        }
        comment.content = content;
        await this.commentsRepository.save(comment);
        return (0, Either_1.right)({
            comment,
        });
    }
};
exports.UpdateCommentUseCase = UpdateCommentUseCase;
exports.UpdateCommentUseCase = UpdateCommentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Comments)),
    __metadata("design:paramtypes", [CommentsRepository_1.CommentsRepository])
], UpdateCommentUseCase);
//# sourceMappingURL=index.js.map