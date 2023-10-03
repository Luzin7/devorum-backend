import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { DeleteCommentUseCase } from '@module/comments/useCases/deleteCommentUseCase';
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter';
import { container } from 'tsyringe';
import { z } from 'zod';
const deleteCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
    topicId: z.string().uuid(),
});
export class DeleteCommentController {
    async handle(req, res) {
        const { id } = req.user;
        const { commentId, topicId } = deleteCommentParamsSchema.parse(req.params);
        const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);
        const response = await deleteCommentUseCase.execute({
            authorId: id,
            commentId,
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