"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeComment = void 0;
const faker_1 = require("@faker-js/faker");
const Comment_1 = require("@module/comments/entities/Comment");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
function makeComment(override = {}, id) {
    const comment = Comment_1.Comment.create({
        authorId: new UniqueId_1.UniqueId(faker_1.fakerPT_BR.string.uuid()),
        content: faker_1.fakerPT_BR.lorem.sentence(5),
        topicId: new UniqueId_1.UniqueId(faker_1.fakerPT_BR.string.uuid()),
        ...override,
    }, id);
    return comment;
}
exports.makeComment = makeComment;
//# sourceMappingURL=makeComment.js.map