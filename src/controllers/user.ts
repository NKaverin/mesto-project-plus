import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { IUserRequest } from '../services/interfaces';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch(() => {
      next(new BadRequestError('Некорректные данные'));
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch(() => {
      next(new NotFoundError('Пользователь не найден'));
    });
};

export const updateUser = (req: IUserRequest, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(req.user?._id, { name: req.body.name, about: req.body.about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(() => {
      next(new BadRequestError('Некорректные данные'));
    });
};

export const updateAvatar = (req: IUserRequest, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(req.user?._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(() => {
      next(new BadRequestError('Некорректные данные'));
    });
};
