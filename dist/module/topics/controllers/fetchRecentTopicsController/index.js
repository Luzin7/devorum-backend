"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchRecentTopicsController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const topicWithAuthorPresenter_1 = require("@module/topics/presenters/topicWithAuthorPresenter");
const fetchRecentTopicsUseCase_1 = require("@module/topics/useCases/fetchRecentTopicsUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const fetchRecentTopicsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().max(1000).optional(),
    perPage: zod_1.z.coerce.number().max(100).optional(),
});
class FetchRecentTopicsController {
    async handle(req, res) {
        const { page, perPage } = fetchRecentTopicsQuerySchema.parse(req.query);
        const fetchRecentTopicsUserCase = tsyringe_1.container.resolve(fetchRecentTopicsUseCase_1.FetchRecentTopicsUseCase);
        const response = await fetchRecentTopicsUserCase.execute({
            page,
            perPage,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        const { topics } = response.value;
        return res.status(statusCodeMapper_1.statusCodeMapper.OK).json({
            topics: topics.map(topicWithAuthorPresenter_1.TopicsWithAuthorPresenter.toHTTP),
        });
    }
}
exports.FetchRecentTopicsController = FetchRecentTopicsController;
//# sourceMappingURL=index.js.map