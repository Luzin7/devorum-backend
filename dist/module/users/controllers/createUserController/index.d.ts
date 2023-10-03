import { Controller } from '@shared/core/infra/Controller';
import { Request, Response } from 'express';
export declare class CreateUserController implements Controller {
    handle(req: Request, res: Response): Promise<Response>;
}
