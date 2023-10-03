"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsPrismaRepository = void 0;
const createConnection_1 = require("@infra/database/createConnection");
const CommentsPrismaMapper_1 = require("./CommentsPrismaMapper");
const DomainEvents_1 = require("@shared/core/events/DomainEvents");
class CommentsPrismaRepository {
    async create(comment) {
        await createConnection_1.prisma.comment.create({
            data: CommentsPrismaMapper_1.CommentsPrismaMapper.toPrisma(comment),
        });
        DomainEvents_1.DomainEvents.dispatchEventsForAggregate(comment.id);
    }
    async findById(id) {
        const comment = await createConnection_1.prisma.comment.findUnique({
            where: {
                id,
            },
        });
        if (!comment)
            return null;
        return CommentsPrismaMapper_1.CommentsPrismaMapper.toEntity(comment);
    }
    async delete(id) {
        await createConnection_1.prisma.comment.delete({
            where: {
                id,
            },
        });
    }
    async save(comment) {
        await createConnection_1.prisma.comment.update({
            where: {
                id: comment.id.toString(),
            },
            data: CommentsPrismaMapper_1.CommentsPrismaMapper.toPrisma(comment),
        });
        DomainEvents_1.DomainEvents.dispatchEventsForAggregate(comment.id);
    }
}
exports.CommentsPrismaRepository = CommentsPrismaRepository;
//# sourceMappingURL=CommentsPrismaRepository.js.map