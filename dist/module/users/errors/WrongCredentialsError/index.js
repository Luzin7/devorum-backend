import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class WrongCredentialsError extends Error {
    constructor() {
        super('Wrong credentials');
        this.statusCode = statusCodeMapper.Unauthorized;
    }
}
//# sourceMappingURL=index.js.map