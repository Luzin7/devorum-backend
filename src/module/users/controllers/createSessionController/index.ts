import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CreateSessionUseCase } from '@module/users/useCases/createSessionUseCase'
import { AuthConfig } from '@providers/auth/config'
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

    res.cookie(AuthConfig.accessTokenCookie, accessToken, {
      maxAge: 1000 * 60 * 5, // 5 min
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    })

    res.cookie(AuthConfig.refreshTokenCookie, refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    })

    return res.status(statusCodeMapper.NoContent).end()
  }
}
