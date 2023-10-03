import { left, right } from './Either';
function correctTheSumValue(x, y, z) {
    const some = x + y;
    if (some === z) {
        return right('success');
    }
    return left('error');
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