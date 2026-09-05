import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      enum: ['donor', 'recipient', 'volunteer', 'admin'],
      default: 'donor',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
