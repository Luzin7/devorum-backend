import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class CommentNotCanBeUpdatedError extends Error {
    constructor() {
        super('Comment not can update');
        this.statusCode = statusCodeMapper.Conflict;
    }
}
//# sourceMappingURL=index.js.map