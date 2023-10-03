import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository';
import { makeUser } from '@test/module/user/factories/makeUser';
import { UserAlreadyExitesError } from '@module/users/errors/UserAlreadyExitesError';
import { CreateUserUseCase } from '.';
import { FakeCryptographyProvider } from '@test/providers/cryptography/fakeCryptographyProvider';
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory';
let notificationsRepository;
let usersRepository;
let cryptographyProvider;
let sut;
describe('create user', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository(notificationsRepository);
        cryptographyProvider = new FakeCryptographyProvider();
        sut = new CreateUserUseCase(usersRepository, cryptographyProvider);
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
        const user = makeUser({
            email: 'jonh@doe.com',
        });
        usersRepository.create(user);
        const response = await sut.execute({
            email: 'jonh@doe.com',
            name: 'jao doe',
            password: 'password',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserAlreadyExitesError);
    });
});
//# sourceMappingURL=index.spec.js.map