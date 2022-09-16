import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import users from './routes/user';
import cards from './routes/cards';
import { IUserRequest } from './services/interfaces';
import errorsHandler from './middlewares/error-handler';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
const database = mongoose.connection;

database.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

database.once('connected', () => {
  // eslint-disable-next-line no-console
  console.log('connected');
});

app.use((req: IUserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6323220a3b4ba3da0b61c771',
  };

  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', users);
app.use('/cards', cards);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
