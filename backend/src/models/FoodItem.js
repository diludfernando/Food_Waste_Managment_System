import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a food title/name'],
    },
    quantity: {
      type: String,
      required: [true, 'Please specify quantity (e.g., 5 kg or 10 meals)'],
    },
    expiryTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'claimed', 'expired'],
      default: 'available',
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);
