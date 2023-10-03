import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor';
import { Topic as TopicPrisma, User as UserPrisma } from '@prisma/client';
type TopicWithAuthorPrisma = TopicPrisma & {
    author: UserPrisma;
    _count: {
        comments: number;
    };
};
export declare class TopicsWithAuthorMapper {
    static toTopicWithAuthor(raw: TopicWithAuthorPrisma): TopicWithAuthor;
}
export {};
