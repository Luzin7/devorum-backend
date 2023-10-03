import { Request, Response } from 'express';
export declare abstract class Controller {
    abstract handle(req: Request, res: Response): Promise<Response>;
}
