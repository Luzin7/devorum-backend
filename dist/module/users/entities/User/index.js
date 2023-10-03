"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const AggregateRoot_1 = require("@shared/core/entities/AggregateRoot");
class User extends AggregateRoot_1.AggregateRoot {
    static create(props, id) {
        const userProps = {
            createdAt: props.createdAt ?? new Date(),
            name: props.name,
            password: props.password,
            salt: props.salt,
            email: props.email,
        };
        const user = new User(userProps, id);
        return user;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get name() {
        return this.props.name;
    }
    get password() {
        return this.props.password;
    }
    get salt() {
        return this.props.salt;
    }
    get email() {
        return this.props.email;
    }
}
exports.User = User;
//# sourceMappingURL=index.js.map