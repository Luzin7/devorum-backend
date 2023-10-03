"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
class UserPresenter {
    static toHTTP(user) {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
        };
    }
}
exports.UserPresenter = UserPresenter;
//# sourceMappingURL=userPresenter.js.map