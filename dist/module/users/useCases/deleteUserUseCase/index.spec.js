"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const _1 = require(".");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const UserNotFoundError_1 = require("@module/users/errors/UserNotFoundError");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let usersRepository;
let sut;
describe('delete user', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        sut = new _1.DeleteUserUseCase(usersRepository);
    });
    it('should be able to delete an user', async () => {
        const user = (0, makeUser_1.makeUser)({}, new UniqueId_1.UniqueId('user-1'));
        usersRepository.create(user);
        const response = await sut.execute({
            id: 'user-1',
        });
        expect(response.isRight()).toEqual(true);
        expect(usersRepository.users.length).toEqual(0);
    });
    it('not should be able to delete an unixistent user', async () => {
        const response = await sut.execute({
            id: 'non-existent-user-id',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserNotFoundError_1.UserNotFoundError);
    });
});
//# sourceMappingURL=index.spec.js.map