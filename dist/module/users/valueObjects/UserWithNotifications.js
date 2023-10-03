import { ValueObject } from '@shared/core/entities/ValueObject';
export class UserWithNotifications extends ValueObject {
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
//# sourceMappingURL=UserWithNotifications.js.map