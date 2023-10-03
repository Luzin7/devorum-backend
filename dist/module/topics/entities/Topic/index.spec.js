"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueId_1 = require("@shared/core/entities/UniqueId");
const _1 = require(".");
describe('Instance topic', () => {
    it('should instance a new topic', () => {
        const topic = _1.Topic.create({
            authorId: new UniqueId_1.UniqueId(),
            title: 'Titulo legal',
            content: 'Cool content',
        });
        expect(topic.id).toBeInstanceOf(UniqueId_1.UniqueId);
        expect(topic.createdAt).toBeInstanceOf(Date);
        expect(topic.content).toEqual('Cool content');
    });
});
//# sourceMappingURL=index.spec.js.map