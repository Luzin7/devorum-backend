import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class UserNotFoundError extends Error {
    constructor() {
        super('User not found');
        this.statusCode = statusCodeMapper.Conflict;
    }
}
//# sourceMappingURL=index.js.map