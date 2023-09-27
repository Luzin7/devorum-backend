import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CreateSessionUseCase } from '@module/users/useCases/createSessionUseCase'
import { Request, Response } from 'express'
import { AuthConfig } from 'providers/authProvider/config'
import { container } from 'tsyringe'
import { z } from 'zod'

const CreateSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export class CreateSessionController {
  private readonly createSessionUseCase =
    container.resolve(CreateSessionUseCase)

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = CreateSessionBodySchema.parse(req.body)

    const response = await this.createSessionUseCase.execute({
      email,
      password,
    })

    if (response.isLeft()) {
      const error = response.value

      return res.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
      })
    }

    const { accessToken, refreshToken } = response.value

    res.cookie(AuthConfig.accessTokenCookie, accessToken, {
      maxAge: 1000 * 60 * 5, // 5 min
      httpOnly: true,
      path: '/',
      sameSite: false,
      secure: true,
    })

    res.cookie(AuthConfig.accessTokenCookie, refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      path: '/',
      sameSite: false,
      secure: true,
    })

    return res.status(statusCodeMapper.NoContent).end()
  }
}
