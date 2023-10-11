import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CreateSessionUseCase } from '@module/users/useCases/createSessionUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const createSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export class CreateSessionController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = createSessionBodySchema.parse(req.body)

    const createSessionUseCase = container.resolve(CreateSessionUseCase)

    const response = await createSessionUseCase.execute({
      email,
      password,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    const { accessToken, refreshToken } = response.value

    return res.status(statusCodeMapper.OK).json({
      accessToken,
      refreshToken,
    })
  }
}
