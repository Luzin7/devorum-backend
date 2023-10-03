import { fakerPT_BR } from '@faker-js/faker';
import { User } from '@module/users/entities/User';
export function makeUser(override = {}, id) {
    const user = User.create({
        email: fakerPT_BR.internet.email(),
        name: fakerPT_BR.person.fullName(),
        password: fakerPT_BR.internet.password(),
        salt: fakerPT_BR.internet.ipv6(),
        createdAt: new Date(),
        ...override,
    }, id);
    return user;
}
//# sourceMappingURL=makeUser.js.map