"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("./Either");
function correctTheSumValue(x, y, z) {
    const some = x + y;
    if (some === z) {
        return (0, Either_1.right)('success');
    }
    return (0, Either_1.left)('error');
}
describe('Error handling', () => {
    test('success result', () => {
        const result = correctTheSumValue(2, 2, 4);
        expect(result.isRight()).toEqual(true);
    });
    test('error result', () => {
        const result = correctTheSumValue(2, 2, 5);
        expect(result.isLeft()).toEqual(true);
    });
});
//# sourceMappingURL=Either.spec.js.map