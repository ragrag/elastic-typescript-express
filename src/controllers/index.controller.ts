import { NextFunction, Request, Response } from 'express';
import EventEmitter from '../common/utils/eventEmitter';

class IndexController {
  constructor() {
    EventEmitter.on('event', () => {
      console.log('an event occurred!');
    });
  }
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      EventEmitter.emit('event');
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
