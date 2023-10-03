import { TopicWithAuthor } from '../valueObjects/TopicWithAuthor';
export declare class TopicsWithAuthorPresenter {
    static toHTTP(topicWithAuthor: TopicWithAuthor): {
        topicId: string;
        authorId: string;
        content: string;
        authorName: string;
        topicCreatedAt: Date;
        topicUpdatedAt: Date | null;
        numberOfComments: number;
    };
}
