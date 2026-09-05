import express from 'express';
import {
  getAvailableFood,
  getReservations,
  getCompletedRescues,
  reserveFood,
  completePickup,
  getCharityStats,
} from '../controllers/charityController.js';

const router = express.Router();

router.get('/available', getAvailableFood);
router.get('/reservations', getReservations);
router.get('/completed', getCompletedRescues);
router.post('/reserve/:id', reserveFood);
router.post('/complete/:id', completePickup);
router.get('/stats', getCharityStats);

export default router;
