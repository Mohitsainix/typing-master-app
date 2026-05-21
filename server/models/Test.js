import mongoose from 'mongoose';

const testSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    wpm: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    mistakes: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      enum: ['timed', 'paragraph', 'quote', 'random', 'numbers', 'coding'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard', 'expert'],
    },
    duration: {
      type: Number,
      required: true, // duration in seconds
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model('Test', testSchema);
export default Test;
