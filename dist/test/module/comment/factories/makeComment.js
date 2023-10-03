import { fakerPT_BR } from '@faker-js/faker';
import { Comment } from '@module/comments/entities/Comment';
import { UniqueId } from '@shared/core/entities/UniqueId';
export function makeComment(override = {}, id) {
    const comment = Comment.create({
        authorId: new UniqueId(fakerPT_BR.string.uuid()),
        content: fakerPT_BR.lorem.sentence(5),
        topicId: new UniqueId(fakerPT_BR.string.uuid()),
        ...override,
    }, id);
    return comment;
}
//# sourceMappingURL=makeComment.js.map