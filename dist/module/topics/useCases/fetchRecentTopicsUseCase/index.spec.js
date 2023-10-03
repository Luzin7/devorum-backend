"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const TopicsInMemoryRepository_1 = require("@test/module/topic/repositories/TopicsInMemoryRepository");
const makeTopic_1 = require("@test/module/topic/factories/makeTopic");
const _1 = require(".");
const makeUser_1 = require("@test/module/user/factories/makeUser");
const UsersInMemoryRepository_1 = require("@test/module/user/repositories/UsersInMemoryRepository");
const NotificationsInMemory_1 = require("@test/module/notification/repositories/NotificationsInMemory");
let notificationsRepository;
let usersRepository;
let topicsRepository;
let sut;
describe('Fetch recent topics', () => {
    beforeEach(() => {
        notificationsRepository = new NotificationsInMemory_1.NotificationsInMemoryRepository();
        usersRepository = new UsersInMemoryRepository_1.UsersInMemoryRepository(notificationsRepository);
        topicsRepository = new TopicsInMemoryRepository_1.TopicsInMemoryRepository(usersRepository);
        sut = new _1.FetchRecentTopicsUseCase(topicsRepository);
    });
    it('should be able to fetch a recent topics', async () => {
        const user = (0, makeUser_1.makeUser)();
        usersRepository.create(user);
        for (let i = 0; i < 30; i++) {
            const topic = (0, makeTopic_1.makeTopic)({
                authorId: user.id,
            });
            topicsRepository.create(topic);
        }
        const response = await sut.execute({});
        expect(response.isRight()).toEqual(true);
        expect(topicsRepository.topics).toHaveLength(30);
        if (response.isRight()) {
            expect(response.value.topics).toHaveLength(20);
            expect(response.value.topics[0].authorName).toEqual(user.name);
        }
    });
    it('should be able to fetch a recent topics whit 10 per page', async () => {
        const user = (0, makeUser_1.makeUser)();
        usersRepository.create(user);
        for (let i = 0; i < 30; i++) {
            const topic = (0, makeTopic_1.makeTopic)({
                authorId: user.id,
            });
            topicsRepository.create(topic);
        }
        const response = await sut.execute({
            perPage: 10,
        });
        expect(response.isRight()).toEqual(true);
        expect(topicsRepository.topics).toHaveLength(30);
        if (response.isRight()) {
            expect(response.value.topics).toHaveLength(10);
            expect(response.value.topics[0].authorName).toEqual(user.name);
        }
    });
    it('should be able to fetch a recent topics on different page', async () => {
        const user = (0, makeUser_1.makeUser)();
        usersRepository.create(user);
        for (let i = 0; i < 30; i++) {
            const topic = (0, makeTopic_1.makeTopic)({
                authorId: user.id,
            });
            topicsRepository.create(topic);
        }
        const response = await sut.execute({
            page: 2,
        });
        expect(response.isRight()).toEqual(true);
        expect(topicsRepository.topics).toHaveLength(30);
        if (response.isRight()) {
            expect(response.value.topics).toHaveLength(10);
            expect(response.value.topics[0].authorName).toEqual(user.name);
        }
    });
});
//# sourceMappingURL=index.spec.js.map