"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const UniqueId_1 = require("../UniqueId");
class Entity {
    constructor(props, id) {
        this.props = props;
        this._id = id ?? new UniqueId_1.UniqueId();
    }
    get id() {
        return this._id;
    }
    equals(entity) {
        return entity.id.equals(this.id);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=index.js.map