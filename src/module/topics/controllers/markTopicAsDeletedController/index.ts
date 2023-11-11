import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { MarkTopicAsDeletedUseCase } from '@module/topics/useCases/markTopicAsDeletedUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const markTopicAsDeletedParamsSchema = z.object({
  topicId: z.string().uuid(),
})

export class MarkTopicAsDeletedController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { topicId } = markTopicAsDeletedParamsSchema.parse(req.params)

    const markTopicAsDeletedUseCase = container.resolve(
      MarkTopicAsDeletedUseCase,
    )

    const response = await markTopicAsDeletedUseCase.execute({
      authorId: id,
      topicId,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    return res.status(statusCodeMapper.NoContent).end()
  }
}
