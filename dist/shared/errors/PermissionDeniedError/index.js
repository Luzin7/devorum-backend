import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class PermissionDeniedError extends Error {
    constructor() {
        super('Permission denied');
        this.statusCode = statusCodeMapper.Unauthorized;
    }
}
//# sourceMappingURL=index.js.map