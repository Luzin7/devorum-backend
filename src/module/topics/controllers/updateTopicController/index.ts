import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { TopicPresenter } from '@module/topics/presenters/topicPresenter'
import { UpdateTopicUseCase } from '@module/topics/useCases/updateTopicUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const updateTopicBodySchema = z.object({
  content: z.string().min(6),
  title: z.string().min(6).max(80),
})

const updateTopicParamsSchema = z.object({
  topicId: z.string().uuid(),
})

export class UpdateTopicController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { topicId } = updateTopicParamsSchema.parse(req.params)
    const { content, title } = updateTopicBodySchema.parse(req.body)

    const updateTopicUseCase = container.resolve(UpdateTopicUseCase)

    const response = await updateTopicUseCase.execute({
      authorId: id,
      content,
      title,
      topicId,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    const { topic } = response.value

    return res.status(statusCodeMapper.OK).json({
      topic: TopicPresenter.toHTTP(topic),
    })
  }
}
