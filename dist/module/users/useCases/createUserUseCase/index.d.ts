import { User } from '@module/users/entities/User';
import { UserAlreadyExitesError } from '@module/users/errors/UserAlreadyExitesError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { CryptographyProvider } from '@providers/cryptography/contracts/CryptographyProvider';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    name: string;
    password: string;
    email: string;
}
type Response = Either<UserAlreadyExitesError, {
    user: User;
}>;
export declare class CreateUserUseCase implements UseCase<Request, Response> {
    private readonly usersRepository;
    private readonly cryptographyProvider;
    constructor(usersRepository: UsersRepository, cryptographyProvider: CryptographyProvider);
    execute({ email, name, password }: Request): Promise<Response>;
}
export {};
