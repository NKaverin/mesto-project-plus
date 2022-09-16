import mongoose from 'mongoose';
import { ICard } from '../services/interfaces';

const cardsSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: [2, 'Название должно содержать не менее 2 символов'],
    maxlength: [30, 'Название должно содержать менее 30 символов'],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    minlength: 2,
    required: true,
  },
});

export default mongoose.model('cards', cardsSchema);
