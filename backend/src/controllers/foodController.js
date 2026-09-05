import { asyncHandler } from '../utils/asyncHandler.js';

// Sample in-memory food items list for quick initial testing without DB
const mockFoodItems = [
  {
    id: '1',
    title: 'Surplus Fresh Vegetables',
    quantity: '15 kg',
    expiryTime: new Date(Date.now() + 86400000).toISOString(),
    location: 'Community Center Kitchen A',
    status: 'available',
  },
  {
    id: '2',
    title: 'Packaged Sandwiches & Bakery',
    quantity: '30 meals',
    expiryTime: new Date(Date.now() + 43200000).toISOString(),
    location: 'Downtown Food Pantry',
    status: 'available',
  },
];

// @desc    Get all available food items
// @route   GET /api/food
export const getFoodItems = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    count: mockFoodItems.length,
    data: mockFoodItems,
  });
});

// @desc    Create a new food donation item
// @route   POST /api/food
export const createFoodItem = asyncHandler(async (req, res) => {
  const { title, quantity, expiryTime, location } = req.body;

  if (!title || !quantity || !location) {
    res.status(400);
    throw new Error('Please provide title, quantity, and location');
  }

  const newItem = {
    id: String(mockFoodItems.length + 1),
    title,
    quantity,
    expiryTime: expiryTime || new Date(Date.now() + 86400000).toISOString(),
    location,
    status: 'available',
  };

  mockFoodItems.push(newItem);

  res.status(201).json({
    success: true,
    data: newItem,
  });
});
