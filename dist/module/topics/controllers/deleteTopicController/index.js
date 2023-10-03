"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTopicController = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
const deleteTopicUseCase_1 = require("@module/topics/useCases/deleteTopicUseCase");
const ErrorPresenter_1 = require("@shared/presenters/ErrorPresenter");
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const deleteTopicParamsSchema = zod_1.z.object({
    topicId: zod_1.z.string().uuid(),
});
class DeleteTopicController {
    async handle(req, res) {
        const { id } = req.user;
        const { topicId } = deleteTopicParamsSchema.parse(req.params);
        const deleteTopicUseCase = tsyringe_1.container.resolve(deleteTopicUseCase_1.DeleteTopicUseCase);
        const response = await deleteTopicUseCase.execute({
            authorId: id,
            topicId,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter_1.ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper_1.statusCodeMapper.NoContent).end();
    }
}
exports.DeleteTopicController = DeleteTopicController;
//# sourceMappingURL=index.js.map