import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CreateCommentUseCase } from '@module/comments/useCases/createCommentUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const createCommentBodySchema = z.object({
  content: z.string().min(6),
})

const createCommentParamsSchema = z.object({
  topicId: z.string().uuid(),
})

export class CreateCommentController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { content } = createCommentBodySchema.parse(req.body)
    const { topicId } = createCommentParamsSchema.parse(req.params)

    const createCommentUseCase = container.resolve(CreateCommentUseCase)

    const response = await createCommentUseCase.execute({
      authorId: id,
      content,
      topicId,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    return res.status(statusCodeMapper.Created).end()
  }
}
