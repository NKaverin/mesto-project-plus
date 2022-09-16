import mongoose from 'mongoose';
import { IUser } from '../services/interfaces';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Имя должно содержать не менее 2 символов'],
    maxlength: [30, 'Имя должно содержать менее 30 символов'],
  },
  about: {
    type: String,
    minlength: [2, 'Описание должно содержать не менее 2 символов'],
    maxlength: [200, 'Описание должно содержать менее 200 символов'],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model('user', userSchema);
