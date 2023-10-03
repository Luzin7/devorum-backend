"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const fakeCryptographyProvider_1 = require("@test/providers/cryptography/fakeCryptographyProvider");
const _1 = require(".");
const fakeAuthProvider_1 = require("@test/providers/auth/fakeAuthProvider");
const WrongCredentialsError_1 = require("@module/users/errors/WrongCredentialsError");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let usersRepository;
let cryptographyProvider;
let authProvider;
let sut;
describe('create session', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        cryptographyProvider = new fakeCryptographyProvider_1.FakeCryptographyProvider();
        authProvider = new fakeAuthProvider_1.FakeAuthProvider();
        sut = new _1.CreateSessionUseCase(cryptographyProvider, usersRepository, authProvider);
    });
    it('should be able to create an new session for user', async () => {
        const { hash, salt } = await cryptographyProvider.hashCreator('12345678');
        const user = (0, makeUser_1.makeUser)({
            password: hash,
            salt,
            email: 'test@test.com',
        });
        await usersRepository.create(user);
        const response = await sut.execute({
            email: 'test@test.com',
            password: '12345678',
        });
        expect(response.isRight()).toEqual(true);
        expect(usersRepository.users[0].password).not.equal('password');
        if (response.isRight()) {
            expect(response.value.accessToken).toEqual(`${user.id.toString()}-access`);
        }
    });
    it('not should be able to create an new session for user if pass is wrong', async () => {
        const { hash, salt } = await cryptographyProvider.hashCreator('12345678');
        const user = (0, makeUser_1.makeUser)({
            password: hash,
            salt,
            email: 'test@test.com',
        });
        await usersRepository.create(user);
        const response = await sut.execute({
            email: 'test@test.com',
            password: 'wrong-password',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(WrongCredentialsError_1.WrongCredentialsError);
    });
    it('not should be able to create an new session for user if user not exist', async () => {
        const response = await sut.execute({
            email: 'unixistent@user.com',
            password: '12345678',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(WrongCredentialsError_1.WrongCredentialsError);
    });
});
//# sourceMappingURL=index.spec.js.map