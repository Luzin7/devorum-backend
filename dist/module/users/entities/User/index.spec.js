"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const _1 = require(".");
describe('instance user', () => {
    it('should instance a new user', () => {
        const user = _1.User.create({
            email: 'email@email.email',
            name: 'John',
            password: 'password',
            salt: 'salt',
        });
        expect(user.id).toBeInstanceOf(UniqueId_1.UniqueId);
        expect(user.createdAt).toBeInstanceOf(Date);
    });
});
//# sourceMappingURL=index.spec.js.map