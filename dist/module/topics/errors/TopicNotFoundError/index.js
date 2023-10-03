import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class TopicNotFoundError extends Error {
    constructor() {
        super('Topic not found');
        this.statusCode = statusCodeMapper.Conflict;
    }
}
//# sourceMappingURL=index.js.map