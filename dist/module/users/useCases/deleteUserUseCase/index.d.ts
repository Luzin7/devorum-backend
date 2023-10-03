import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    id: string;
}
type Response = Either<UserNotFoundError, null>;
export declare class DeleteUserUseCase implements UseCase<Request, Response> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute({ id }: Request): Promise<Response>;
}
export {};
