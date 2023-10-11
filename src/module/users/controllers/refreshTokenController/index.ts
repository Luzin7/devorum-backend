import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { RefreshTokenUseCase } from '@module/users/useCases/refreshTokenUseCase'
import { AuthConfig } from '@providers/auth/config'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class RefreshTokenController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshTokenInCookies = req.cookies[AuthConfig.refreshTokenCookie]

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const response = await refreshTokenUseCase.execute({
      refreshTokenReceived: refreshTokenInCookies,
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
      sameSite: true,
      secure: false,
    })

    res.cookie(AuthConfig.accessTokenCookie, refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      path: '/',
      sameSite: true,
      secure: false,
    })

    return res.status(statusCodeMapper.NoContent).end()
  }
}
