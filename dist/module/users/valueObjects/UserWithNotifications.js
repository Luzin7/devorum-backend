"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithNotifications = void 0;
const ValueObject_1 = require("@shared/core/entities/ValueObject");
class UserWithNotifications extends ValueObject_1.ValueObject {
    static create(props) {
        return new UserWithNotifications(props);
    }
    get userId() {
        return this.props.userId;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get notifications() {
        return this.props.notifications;
    }
}
exports.UserWithNotifications = UserWithNotifications;
//# sourceMappingURL=UserWithNotifications.js.map