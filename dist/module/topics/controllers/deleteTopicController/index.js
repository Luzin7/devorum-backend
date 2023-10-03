import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { DeleteTopicUseCase } from '@module/topics/useCases/deleteTopicUseCase';
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter';
import { container } from 'tsyringe';
import { z } from 'zod';
const deleteTopicParamsSchema = z.object({
    topicId: z.string().uuid(),
});
export class DeleteTopicController {
    async handle(req, res) {
        const { id } = req.user;
        const { topicId } = deleteTopicParamsSchema.parse(req.params);
        const deleteTopicUseCase = container.resolve(DeleteTopicUseCase);
        const response = await deleteTopicUseCase.execute({
            authorId: id,
            topicId,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper.NoContent).end();
    }
}
//# sourceMappingURL=index.js.map