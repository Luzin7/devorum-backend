import { User } from '@module/users/entities/User';
import { WrongCredentialsError } from '@module/users/errors/WrongCredentialsError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { AuthProvider } from '@providers/auth/contracts/AuthProvider';
import { CryptographyProvider } from '@providers/cryptography/contracts/CryptographyProvider';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    email: string;
    password: string;
}
type Response = Either<WrongCredentialsError, {
    user: User;
    accessToken: string;
    refreshToken: string;
}>;
export declare class CreateSessionUseCase implements UseCase<Request, Response> {
    private readonly cryptographyProvider;
    private readonly usersRepository;
    private readonly authProvider;
    constructor(cryptographyProvider: CryptographyProvider, usersRepository: UsersRepository, authProvider: AuthProvider);
    execute({ email, password }: Request): Promise<Response>;
}
export {};
