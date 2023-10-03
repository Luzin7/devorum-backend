import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { DomainEvents } from '@shared/core/events/DomainEvents';
export class CommentsInMemoryRepository extends CommentsRepository {
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
        DomainEvents.dispatchEventsForAggregate(comment.id);
    }
    async create(comment) {
        this.comments.push(comment);
        DomainEvents.dispatchEventsForAggregate(comment.id);
    }
    async findById(id) {
        const comment = this.comments.find((comment) => comment.id.equals(new UniqueId(id)));
        return comment ?? null;
    }
    async delete(id) {
        this.comments = this.comments.filter((comment) => !comment.id.equals(new UniqueId(id)));
    }
}
//# sourceMappingURL=CommentsInMemoryRepository.js.map