import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CreateTopicUseCase } from '@module/topics/useCases/createTopicUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const createTopicBodySchema = z.object({
  content: z.string().min(6),
  title: z.string().min(6).max(80),
})

export class CreateTopicController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { content, title } = createTopicBodySchema.parse(req.body)

    const createTopicUseCase = container.resolve(CreateTopicUseCase)

    const response = await createTopicUseCase.execute({
      authorId: id,
      content,
      title,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    return res.status(statusCodeMapper.Created).end()
  }
}
