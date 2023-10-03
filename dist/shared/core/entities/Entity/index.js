import { UniqueId } from '../UniqueId';
export class Entity {
    constructor(props, id) {
        this.props = props;
        this._id = id ?? new UniqueId();
    }
    get id() {
        return this._id;
    }
    equals(entity) {
        return entity.id.equals(this.id);
    }
}
//# sourceMappingURL=index.js.map