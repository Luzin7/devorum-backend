"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTopic = void 0;
const faker_1 = require("@faker-js/faker");
const Topic_1 = require("@module/topics/entities/Topic");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
function makeTopic(override = {}, id) {
    const topic = Topic_1.Topic.create({
        authorId: new UniqueId_1.UniqueId(faker_1.fakerPT_BR.string.uuid()),
        content: faker_1.fakerPT_BR.lorem.sentence(5),
        title: faker_1.fakerPT_BR.lorem.words(8),
        ...override,
    }, id);
    return topic;
}
exports.makeTopic = makeTopic;
//# sourceMappingURL=makeTopic.js.map