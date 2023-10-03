import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper';
export class ErrorPresenter {
    static toHTTP(req, res, err) {
        return res.status(err?.statusCode ?? statusCodeMapper.BadRequest).json({
            message: err?.message ?? 'Bad request',
            statusCode: err?.statusCode ?? statusCodeMapper.BadRequest,
        });
    }
}
//# sourceMappingURL=ErrorPresenter.js.map