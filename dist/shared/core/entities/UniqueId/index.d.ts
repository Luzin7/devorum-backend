export declare class UniqueId {
    private value;
    constructor(id?: string);
    toString(): string;
    toValue(): string;
    equals(id: UniqueId): boolean;
}
