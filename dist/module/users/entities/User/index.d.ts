import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { Optional } from '@shared/core/types/optional';
export interface UserProps {
    createdAt: Date;
    name: string;
    password: string;
    salt: string;
    email: string;
}
export declare class User extends AggregateRoot<UserProps> {
    static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueId): User;
    get createdAt(): Date;
    get name(): string;
    get password(): string;
    get salt(): string;
    get email(): string;
}
