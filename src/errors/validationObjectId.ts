import {
  Request,
  Response,
  NextFunction,
} from 'express';
import mongoose from 'mongoose';
import NotFoundError from './NotFoundError';

const validationObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Некорректный id');
  }
  next();
};

export default validationObjectId;
