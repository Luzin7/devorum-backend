import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class TopicsInMemoryRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.topics = [];
    }
    async save() {
        throw new Error('Method not implemented.');
    }
    async create(topic) {
        this.topics.push(topic);
    }
    async findById(id) {
        const topic = this.topics.find((topic) => topic.id.equals(new UniqueId(id)));
        return topic ?? null;
    }
    async delete(id) {
        this.topics = this.topics.filter((topic) => !topic.id.equals(new UniqueId(id)));
    }
    async findManyRecentWithAuthor({ page, perPage, }) {
        const topics = this.topics
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * perPage, page * perPage);
        const topicsWithAuthor = topics.map((topic) => {
            const user = this.usersRepository.users.find((u) => u.id.equals(topic.authorId));
            if (!user) {
                throw Error('User not created for topic');
            }
            const topicWithAuthor = TopicWithAuthor.create({
                authorId: user.id,
                authorName: user.name,
                content: topic.content,
                topicCreatedAt: topic.createdAt,
                topicId: topic.id,
                topicUpdatedAt: topic.updatedAt,
            });
            return topicWithAuthor;
        });
        return topicsWithAuthor;
    }
}
//# sourceMappingURL=TopicsInMemoryRepository.js.map