export class Left {
    constructor(value) {
        this.value = value;
    }
    isRight() {
        return false;
    }
    isLeft() {
        return true;
    }
}
export class Right {
    constructor(value) {
        this.value = value;
    }
    isRight() {
        return true;
    }
    isLeft() {
        return false;
    }
}
export const left = (value) => {
    return new Left(value);
};
export const right = (value) => {
    return new Right(value);
};
//# sourceMappingURL=Either.js.map