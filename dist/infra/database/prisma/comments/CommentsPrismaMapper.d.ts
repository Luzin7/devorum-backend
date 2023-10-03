import { Comment } from '@module/comments/entities/Comment';
import { Comment as CommentPrisma, Prisma } from '@prisma/client';
export declare class CommentsPrismaMapper {
    static toEntity(raw: CommentPrisma): Comment;
    static toPrisma(comment: Comment): Prisma.CommentUncheckedCreateInput;
}
