"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const UserAlreadyExitesError_1 = require("@module/users/errors/UserAlreadyExitesError");
const _1 = require(".");
const fakeCryptographyProvider_1 = require("@test/providers/cryptography/fakeCryptographyProvider");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let usersRepository;
let cryptographyProvider;
let sut;
describe('create user', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        cryptographyProvider = new fakeCryptographyProvider_1.FakeCryptographyProvider();
        sut = new _1.CreateUserUseCase(usersRepository, cryptographyProvider);
    });
    it('should be able to create an new user', async () => {
        const response = await sut.execute({
            email: 'jonh@doe.com',
            name: 'jao doe',
            password: 'password',
        });
        expect(response.isRight()).toEqual(true);
        expect(usersRepository.users[0].password).not.equal('password');
    });
    it('not should be able to create an new user if user already registered with same email', async () => {
        const user = (0, makeUser_1.makeUser)({
            email: 'jonh@doe.com',
        });
        usersRepository.create(user);
        const response = await sut.execute({
            email: 'jonh@doe.com',
            name: 'jao doe',
            password: 'password',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserAlreadyExitesError_1.UserAlreadyExitesError);
    });
});
//# sourceMappingURL=index.spec.js.map