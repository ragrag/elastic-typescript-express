import { Request, Response } from 'express';

import { isBoom, Boom } from '@hapi/boom';
import { logger } from '../common/utils/logger';

function errorMiddleware(error: Boom | Error, req: Request, res: Response) {
  const statusCode: number = isBoom(error) ? error.output.statusCode : 500;
  const errorMessage: string = isBoom(error) ? error.message : 'Something went wrong';
  logger.error(`StatusCode : ${status}, Message : ${errorMessage}`);
  return res.status(statusCode).send(errorMessage);
}
export default errorMiddleware;
