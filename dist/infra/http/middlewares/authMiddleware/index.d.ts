import { NextFunction, Request, Response } from 'express';
export declare class AuthMiddleware {
    middle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const authMiddleware: AuthMiddleware;
export { authMiddleware };
