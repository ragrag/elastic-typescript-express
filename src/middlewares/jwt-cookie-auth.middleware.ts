import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import './passport';

export default function authenticateWithJwtCookie(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt-cookiecombo', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.clearCookie('Authorization');
      return res.status(401).send('unauthorized');
    }
    req.user = user;
    next();
  })(req, res, next);
}
