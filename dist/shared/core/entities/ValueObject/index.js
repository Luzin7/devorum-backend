export class ValueObject {
    constructor(props) {
        this.props = props;
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
}
//# sourceMappingURL=index.js.map