import { UniqueId } from '@shared/core/entities/UniqueId';
import { Comment } from '.';
describe('Instance comment', () => {
    it('should instance a new comment', () => {
        const comment = Comment.create({
            authorId: new UniqueId(),
            content: 'Cool comment',
            topicId: new UniqueId(),
        });
        expect(comment.id).toBeInstanceOf(UniqueId);
        expect(comment.createdAt).toBeInstanceOf(Date);
    });
});
//# sourceMappingURL=index.spec.js.map