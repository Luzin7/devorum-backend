import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class UserAlreadyExitesError extends Error {
    constructor() {
        super('User already existes');
        this.statusCode = statusCodeMapper.Conflict;
    }
}
//# sourceMappingURL=index.js.map