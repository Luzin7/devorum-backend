import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { TopicsWithAuthorPresenter } from '@module/topics/presenters/topicWithAuthorPresenter'
import { FetchRecentTopicsUseCase } from '@module/topics/useCases/fetchRecentTopicsUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const fetchRecentTopicsQuerySchema = z.object({
  page: z.coerce.number().max(1000).optional(),
  perPage: z.coerce.number().max(100).optional(),
})

export class FetchRecentTopicsController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page, perPage } = fetchRecentTopicsQuerySchema.parse(req.query)

    const fetchRecentTopicsUserCase = container.resolve(
      FetchRecentTopicsUseCase,
    )

    const response = await fetchRecentTopicsUserCase.execute({
      page,
      perPage,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    const { topics } = response.value

    return res.status(statusCodeMapper.OK).json({
      topics: topics.map(TopicsWithAuthorPresenter.toHTTP),
    })
  }
}
