"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicCommentsList = void 0;
const WatchedList_1 = require("@shared/core/entities/WatchedList");
class TopicCommentsList extends WatchedList_1.WatchedList {
    compareItems(a, b) {
        return a.equals(b);
    }
}
exports.TopicCommentsList = TopicCommentsList;
//# sourceMappingURL=index.js.map