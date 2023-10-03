import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    id: string;
}
type Response = Either<UserNotFoundError, {
    user: UserWithNotifications;
}>;
export declare class GetUserUseCase implements UseCase<Request, Response> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute({ id }: Request): Promise<Response>;
}
export {};
