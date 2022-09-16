import { NextFunction, Request, Response } from 'express';
import Cards from '../models/cards';
import { IUserRequest } from '../services/interfaces';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

const { Types } = require('mongoose');

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req: IUserRequest, res: Response, next: NextFunction) => {
  const card = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user!._id,
    text: req.body.text,
  };
  return Cards.create(card)
    .then((newUser) => res.send(newUser))
    .catch(() => {
      next(new BadRequestError('Некорректные данные'));
    });
};

export const getCardById = (req: Request, res: Response, next: NextFunction) => {
  Cards.findById(req.params.id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch(() => {
      next(new NotFoundError('Карточка не найдена'));
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Cards.deleteOne({ _id: req.params.id })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((data) => {
      if (data.deletedCount === 0) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch(() => {
      next(new BadRequestError('Пользователь не найден'));
    });
};

export const likeCard = (req: IUserRequest, res: Response, next: NextFunction) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: Types.ObjectId(req?.user?._id) } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((newCard) => res.send({ data: newCard }))
    .catch(() => {
      next(new NotFoundError('Карточка не найдена'));
    });
};

export const dislikeCard = (req: IUserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    Cards.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: Types.ObjectId(req?.user?._id) } },
      { new: true },
    )
      .orFail(new NotFoundError('Карточка не найдена'))
      .then((newCard) => res.send({ data: newCard }))
      .catch(() => {
        next(new NotFoundError('Карточка не найдена'));
      });
  }
};
