import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
import { CreateTopicUseCase } from '@module/topics/useCases/createTopicUseCase';
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter';
import { container } from 'tsyringe';
import { z } from 'zod';
const createTopicBodySchema = z.object({
    content: z.string().min(6),
    title: z.string().min(6).max(60),
});
export class CreateTopicController {
    async handle(req, res) {
        const { id } = req.user;
        const { content, title } = createTopicBodySchema.parse(req.body);
        const createTopicUseCase = container.resolve(CreateTopicUseCase);
        const response = await createTopicUseCase.execute({
            authorId: id,
            content,
            title,
        });
        if (response.isLeft()) {
            const error = response.value;
            return ErrorPresenter.toHTTP(req, res, error);
        }
        return res.status(statusCodeMapper.Created).end();
    }
}
//# sourceMappingURL=index.js.map