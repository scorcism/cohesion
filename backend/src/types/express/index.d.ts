import { User } from '../common';

declare namespace Express {
    interface Request {
        user: User;
    }
}
