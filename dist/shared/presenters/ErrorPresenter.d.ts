import { UseCaseError } from '@shared/core/errors/UseCaseError';
import { Request, Response } from 'express';
export declare class ErrorPresenter {
    static toHTTP(req: Request, res: Response, err: UseCaseError | null): Response<any, Record<string, any>>;
}
