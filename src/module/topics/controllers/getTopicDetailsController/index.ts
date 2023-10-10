import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { TopicsDetailsPresenter } from '@module/topics/presenters/topicDetailsPresenter'
import { GetTopicDetailsUseCase } from '@module/topics/useCases/getTopicDetailsUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const getTopicDetailsParamsSchema = z.object({
  topicId: z.string().uuid(),
})

export class GetTopicDetailsController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { topicId } = getTopicDetailsParamsSchema.parse(req.params)

    const getTopicDetailsUseCase = container.resolve(GetTopicDetailsUseCase)

    const response = await getTopicDetailsUseCase.execute({
      topicId,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    const { topic } = response.value

    return res.status(statusCodeMapper.OK).json({
      topic: TopicsDetailsPresenter.toHTTP(topic),
    })
  }
}
