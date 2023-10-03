"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsInMemoryRepository = void 0;
const CommentsRepository_1 = require("@module/comments/repositories/contracts/CommentsRepository");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const DomainEvents_1 = require("@shared/core/events/DomainEvents");
class CommentsInMemoryRepository extends CommentsRepository_1.CommentsRepository {
    constructor() {
        super(...arguments);
        this.comments = [];
    }
    async save(comment) {
        const commentIndex = this.comments.findIndex((c) => c.id.equals(comment.id));
        if (commentIndex < 0) {
            throw new Error('Comment not created');
        }
        this.comments[commentIndex] = comment;
        DomainEvents_1.DomainEvents.dispatchEventsForAggregate(comment.id);
    }
    async create(comment) {
        this.comments.push(comment);
        DomainEvents_1.DomainEvents.dispatchEventsForAggregate(comment.id);
    }
    async findById(id) {
        const comment = this.comments.find((comment) => comment.id.equals(new UniqueId_1.UniqueId(id)));
        return comment ?? null;
    }
    async delete(id) {
        this.comments = this.comments.filter((comment) => !comment.id.equals(new UniqueId_1.UniqueId(id)));
    }
}
exports.CommentsInMemoryRepository = CommentsInMemoryRepository;
//# sourceMappingURL=CommentsInMemoryRepository.js.map