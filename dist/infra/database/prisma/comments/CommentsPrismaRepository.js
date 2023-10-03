import { prisma } from '@infra/database/createConnection';
import { CommentsPrismaMapper } from './CommentsPrismaMapper';
import { DomainEvents } from '@shared/core/events/DomainEvents';
export class CommentsPrismaRepository {
    async create(comment) {
        await prisma.comment.create({
            data: CommentsPrismaMapper.toPrisma(comment),
        });
        DomainEvents.dispatchEventsForAggregate(comment.id);
    }
    async findById(id) {
        const comment = await prisma.comment.findUnique({
            where: {
                id,
            },
        });
        if (!comment)
            return null;
        return CommentsPrismaMapper.toEntity(comment);
    }
    async delete(id) {
        await prisma.comment.delete({
            where: {
                id,
            },
        });
    }
    async save(comment) {
        await prisma.comment.update({
            where: {
                id: comment.id.toString(),
            },
            data: CommentsPrismaMapper.toPrisma(comment),
        });
        DomainEvents.dispatchEventsForAggregate(comment.id);
    }
}
//# sourceMappingURL=CommentsPrismaRepository.js.map