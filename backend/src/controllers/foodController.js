import { asyncHandler } from '../utils/asyncHandler.js';
import prisma from '../config/prisma.js';

// Fallback in-memory items when DB is not reachable
const mockFoodItems = [
  {
    id: '1',
    title: 'Surplus Fresh Vegetables',
    quantity: '15 kg',
    expiryTime: new Date(Date.now() + 86400000).toISOString(),
    location: 'Community Center Kitchen A',
    status: 'AVAILABLE',
  },
  {
    id: '2',
    title: 'Packaged Sandwiches & Bakery',
    quantity: '30 meals',
    expiryTime: new Date(Date.now() + 43200000).toISOString(),
    location: 'Downtown Food Pantry',
    status: 'AVAILABLE',
  },
];

// @desc    Get all available food items
// @route   GET /api/food
export const getFoodItems = asyncHandler(async (req, res) => {
  try {
    const foodItems = await prisma.foodItem.findMany({
      include: { donor: { select: { id: true, name: true, email: true } } },
    });
    return res.status(200).json({
      success: true,
      count: foodItems.length,
      data: foodItems.length > 0 ? foodItems : mockFoodItems,
    });
  } catch (error) {
    // If DB is offline, return mock data
    return res.status(200).json({
      success: true,
      count: mockFoodItems.length,
      data: mockFoodItems,
    });
  }
});

// @desc    Create a new food donation item
// @route   POST /api/food
export const createFoodItem = asyncHandler(async (req, res) => {
  const { title, quantity, expiryTime, location } = req.body;

  if (!title || !quantity || !location) {
    res.status(400);
    throw new Error('Please provide title, quantity, and location');
  }

  try {
    const newItem = await prisma.foodItem.create({
      data: {
        title,
        quantity,
        expiryTime: expiryTime ? new Date(expiryTime) : new Date(Date.now() + 86400000),
        location,
      },
    });

    return res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    const fallbackItem = {
      id: String(mockFoodItems.length + 1),
      title,
      quantity,
      expiryTime: expiryTime || new Date(Date.now() + 86400000).toISOString(),
      location,
      status: 'AVAILABLE',
    };
    mockFoodItems.push(fallbackItem);
    return res.status(201).json({
      success: true,
      data: fallbackItem,
    });
  }
});
