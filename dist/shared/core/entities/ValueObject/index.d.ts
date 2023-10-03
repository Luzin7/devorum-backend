export declare abstract class ValueObject<T> {
    protected props: T;
    protected constructor(props: T);
    equals(vo: ValueObject<unknown>): boolean;
}
