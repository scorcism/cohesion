import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { config } from '@/utils/config';

const { JWT_SECRET } = config;

// Configure JWT strategy
const jwtOptions = {
  secretOrKey: String(JWT_SECRET),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    try {
      done(null, jwtPayload || false);
    } catch (error) {
      done(error, false);
    }
  }),
);

// Authentication middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authenticatePromise = new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
      if (err || !user) {
        console.log("auth error")
      }

      resolve(user);
    })(req, res, next);
  });

  authenticatePromise
    .then(async (user: any) => {
      req.user = user as any;
      next();
    })
    .catch((error) => {
      next(error);
    });
};
