export class UserPresenter {
    static toHTTP(user) {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
        };
    }
}
//# sourceMappingURL=userPresenter.js.map