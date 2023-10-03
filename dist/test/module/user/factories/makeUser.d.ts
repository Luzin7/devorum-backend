import { User, UserProps } from '@module/users/entities/User';
import { UniqueId } from '@shared/core/entities/UniqueId';
export declare function makeUser(override?: Partial<UserProps>, id?: UniqueId): User;
