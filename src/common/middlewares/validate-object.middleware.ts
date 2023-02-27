import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {Types} from 'mongoose';
import {HttpError} from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';


export class ValidateObjectMiddleware implements MiddlewareInterface {
  constructor(private param: string) {}

  public execute(req: Request, _res: Response, next: NextFunction) {
    const objectId = req.params[this.param];

    if(Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectId`,
      'ValidateObjectMiddleware'
    );
  }
}
