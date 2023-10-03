"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUser = void 0;
const faker_1 = require("@faker-js/faker");
const User_1 = require("@module/users/entities/User");
function makeUser(override = {}, id) {
    const user = User_1.User.create({
        email: faker_1.fakerPT_BR.internet.email(),
        name: faker_1.fakerPT_BR.person.fullName(),
        password: faker_1.fakerPT_BR.internet.password(),
        salt: faker_1.fakerPT_BR.internet.ipv6(),
        createdAt: new Date(),
        ...override,
    }, id);
    return user;
}
exports.makeUser = makeUser;
//# sourceMappingURL=makeUser.js.map