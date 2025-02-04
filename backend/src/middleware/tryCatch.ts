import { Request, Response, NextFunction } from 'express';

export const tryCatch =
    (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            next(err);
        }
    };
