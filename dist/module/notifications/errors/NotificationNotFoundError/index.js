import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class NotificationNotFoundError extends Error {
    constructor() {
        super('Notification not found');
        this.statusCode = statusCodeMapper.Conflict;
    }
}
//# sourceMappingURL=index.js.map