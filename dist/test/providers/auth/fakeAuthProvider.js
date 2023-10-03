"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeAuthProvider = void 0;
class FakeAuthProvider {
    async encrypt(userId, role = 'access') {
        return `${userId}-${role}`;
    }
    async decrypt(token) {
        const userId = token.split('-')[0];
        return {
            sub: userId,
        };
    }
}
exports.FakeAuthProvider = FakeAuthProvider;
//# sourceMappingURL=fakeAuthProvider.js.map