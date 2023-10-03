"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueId = void 0;
const node_crypto_1 = require("node:crypto");
class UniqueId {
    constructor(id) {
        this.value = id ?? (0, node_crypto_1.randomUUID)();
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
exports.UniqueId = UniqueId;
//# sourceMappingURL=index.js.map