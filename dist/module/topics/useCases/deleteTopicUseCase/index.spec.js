import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository';
import { DeleteTopicUseCase } from '.';
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository';
import { makeUser } from '@test/module/user/factories/makeUser';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { makeTopic } from '@test/module/topic/factories/makeTopic';
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError';
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory';
let notificationsRepository;
let topicsRepository;
let usersRepository;
let sut;
describe('delete topic', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository(usersRepository);
        sut = new DeleteTopicUseCase(topicsRepository, usersRepository);
    });
    it('should be able to delete a topic', async () => {
        const user = makeUser({}, new UniqueId('user-1'));
        const topic = makeTopic({ authorId: user.id }, new UniqueId('topic-1'));
        usersRepository.create(user);
        topicsRepository.create(topic);
        const response = await sut.execute({
            topicId: 'topic-1',
            authorId: 'user-1',
        });
        expect(response.isRight()).toEqual(true);
        expect(topicsRepository.topics.length).toEqual(0);
    });
    it('not should be able to delete a topic if user doesnt exists', async () => {
        const topic = makeTopic({}, new UniqueId('topic-1'));
        topicsRepository.create(topic);
        const response = await sut.execute({
            topicId: 'topic-1',
            authorId: 'non-existent-user-id',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(UserNotFoundError);
    });
    it('not should be able to delete a topic if it doesnt exists', async () => {
        const user = makeUser({}, new UniqueId('user-1'));
        usersRepository.create(user);
        const response = await sut.execute({
            topicId: 'non-existent-topic-id',
            authorId: 'user-1',
        });
        expect(response.isLeft()).toEqual(true);
        expect(response.value).toBeInstanceOf(TopicNotFoundError);
    });
});
//# sourceMappingURL=index.spec.js.map