import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { RefreshTokenUseCase } from '@module/users/useCases/refreshTokenUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class RefreshTokenController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshTokenInCookies = req.headers.refresh_token as string

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const response = await refreshTokenUseCase.execute({
      refreshTokenReceived: refreshTokenInCookies,
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
