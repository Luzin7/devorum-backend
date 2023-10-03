import { UniqueId } from '../UniqueId';
export declare abstract class Entity<T> {
    private _id;
    protected props: T;
    protected constructor(props: T, id?: UniqueId);
    get id(): UniqueId;
    equals(entity: Entity<unknown>): boolean;
}
