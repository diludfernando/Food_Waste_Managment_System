import express from 'express';
import { getFoodItems, createFoodItem } from '../controllers/foodController.js';

const router = express.Router();

router.route('/')
  .get(getFoodItems)
  .post(createFoodItem);

export default router;
