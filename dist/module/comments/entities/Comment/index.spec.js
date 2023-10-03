"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const _1 = require(".");
describe('Instance comment', () => {
    it('should instance a new comment', () => {
        const comment = _1.Comment.create({
            authorId: new UniqueId_1.UniqueId(),
            content: 'Cool comment',
            topicId: new UniqueId_1.UniqueId(),
        });
        expect(comment.id).toBeInstanceOf(UniqueId_1.UniqueId);
        expect(comment.createdAt).toBeInstanceOf(Date);
    });
});
//# sourceMappingURL=index.spec.js.map