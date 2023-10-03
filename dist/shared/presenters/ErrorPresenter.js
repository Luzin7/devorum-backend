"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPresenter = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class ErrorPresenter {
    static toHTTP(req, res, err) {
        return res.status(err?.statusCode ?? statusCodeMapper_1.statusCodeMapper.BadRequest).json({
            message: err?.message ?? 'Bad request',
            statusCode: err?.statusCode ?? statusCodeMapper_1.statusCodeMapper.BadRequest,
        });
    }
}
exports.ErrorPresenter = ErrorPresenter;
//# sourceMappingURL=ErrorPresenter.js.map