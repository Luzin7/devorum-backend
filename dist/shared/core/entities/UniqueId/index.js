import { randomUUID } from 'node:crypto';
export class UniqueId {
    constructor(id) {
        this.value = id ?? randomUUID();
    }
    toString() {
        return this.value;
    }
    toValue() {
        return this.value;
    }
    equals(id) {
        return this.value === id.toString();
    }
}
//# sourceMappingURL=index.js.map