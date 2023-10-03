import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class CommentNotFoundError extends Error {
    constructor() {
        super('Comment not found comment');
        this.statusCode = statusCodeMapper.Conflict;
    }
}
//# sourceMappingURL=index.js.map