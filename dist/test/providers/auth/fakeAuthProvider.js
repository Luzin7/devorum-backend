export class FakeAuthProvider {
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
//# sourceMappingURL=fakeAuthProvider.js.map