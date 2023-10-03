import { WatchedList } from '@shared/core/entities/WatchedList';
export class TopicCommentsList extends WatchedList {
    compareItems(a, b) {
        return a.equals(b);
    }
}
//# sourceMappingURL=index.js.map