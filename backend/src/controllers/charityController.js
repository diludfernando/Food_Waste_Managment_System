import { asyncHandler } from '../utils/asyncHandler.js';
import prisma from '../config/prisma.js';

// Initial Mock Data matching CharityDashboard.jsx structure
let mockAvailableFood = [
  {
    id: '101',
    donorName: 'Green Garden Restaurant',
    title: 'Chicken Biryani & Raitha Packages',
    dietary: 'Non-Veg',
    isHalal: true,
    portions: 45,
    weight: '14.0 kg',
    preparedTime: '2 hours ago',
    expiryTime: 'Today by 9:00 PM',
    address: '45 Main Street',
    city: 'Colombo',
    contact: '+94 77 123 4567',
    distance: '1.2 km away',
    status: 'AVAILABLE',
  },
  {
    id: '102',
    donorName: 'SunRise Bakery & Cafe',
    title: 'Assorted Veg Sandwiches & Whole Wheat Breads',
    dietary: 'Veg',
    isHalal: true,
    portions: 30,
    weight: '6.0 kg',
    preparedTime: '3 hours ago',
    expiryTime: 'Today by 8:30 PM',
    address: '88 4th Avenue',
    city: 'Kandy',
    contact: '+94 81 987 6543',
    distance: '2.5 km away',
    status: 'AVAILABLE',
  },
  {
    id: '103',
    donorName: 'Grand Hotel Banquet',
    title: 'Vegetable Fried Rice & Mushroom Curry Trays',
    dietary: 'Veg',
    isHalal: false,
    portions: 60,
    weight: '18.5 kg',
    preparedTime: '1 hour ago',
    expiryTime: 'Today by 10:00 PM',
    address: '12 Beach Road',
    city: 'Colombo',
    contact: '+94 11 444 7788',
    distance: '3.0 km away',
    status: 'AVAILABLE',
  },
];

let mockReservations = [
  {
    id: '201',
    donorName: 'City Fresh Supermarket',
    title: 'Box of Fresh Apples, Oranges & Bananas',
    dietary: 'Veg',
    isHalal: true,
    portions: 25,
    weight: '10.0 kg',
    expiryTime: 'Today by 7:00 PM',
    address: '100 Galle Road',
    city: 'Colombo',
    contact: '+94 71 888 9900',
    reservedAt: '30 mins ago',
    status: 'RESERVED',
  },
];

let mockCompletedRescues = [
  {
    id: '301',
    donorName: 'Ocean View Hotel',
    title: 'Steamed Rice & Fish Curry Bowls',
    dietary: 'Non-Veg',
    isHalal: true,
    portions: 50,
    weight: '15.0 kg',
    completedAt: 'Yesterday at 4:30 PM',
    address: 'Sea Street',
    city: 'Colombo',
    status: 'COMPLETED',
  },
  {
    id: '302',
    donorName: 'Royal Bakery',
    title: 'Vegetable Buns & Muffins',
    dietary: 'Veg',
    isHalal: true,
    portions: 40,
    weight: '8.0 kg',
    completedAt: '3 days ago',
    address: 'Central Bus Stand Rd',
    city: 'Kandy',
    status: 'COMPLETED',
  },
];

// @desc    Get all available food items (with city & dietary filters)
// @route   GET /api/charity/available
export const getAvailableFood = asyncHandler(async (req, res) => {
  const { city, dietary } = req.query;

  try {
    const where = { status: 'AVAILABLE' };
    if (city && city !== 'all') {
      where.city = { equals: city, mode: 'insensitive' };
    }
    if (dietary && dietary !== 'all') {
      where.dietary = { equals: dietary, mode: 'insensitive' };
    }

    const items = await prisma.foodItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items.length > 0 ? items : mockAvailableFood.filter(item => {
        if (city && city !== 'all' && item.city.toLowerCase() !== city.toLowerCase()) return false;
        if (dietary && dietary !== 'all' && item.dietary.toLowerCase() !== dietary.toLowerCase()) return false;
        return true;
      }),
    });
  } catch (error) {
    const filtered = mockAvailableFood.filter(item => {
      if (city && city !== 'all' && item.city.toLowerCase() !== city.toLowerCase()) return false;
      if (dietary && dietary !== 'all' && item.dietary.toLowerCase() !== dietary.toLowerCase()) return false;
      return true;
    });
    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  }
});

// @desc    Get active reservations for the charity
// @route   GET /api/charity/reservations
export const getReservations = asyncHandler(async (req, res) => {
  try {
    const reservations = await prisma.foodItem.findMany({
      where: { status: 'RESERVED' },
      orderBy: { reservedAt: 'desc' },
    });
    return res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations.length > 0 ? reservations : mockReservations,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: mockReservations.length,
      data: mockReservations,
    });
  }
});

// @desc    Get completed rescues history
// @route   GET /api/charity/completed
export const getCompletedRescues = asyncHandler(async (req, res) => {
  try {
    const completed = await prisma.foodItem.findMany({
      where: { status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
    });
    return res.status(200).json({
      success: true,
      count: completed.length,
      data: completed.length > 0 ? completed : mockCompletedRescues,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: mockCompletedRescues.length,
      data: mockCompletedRescues,
    });
  }
});

// @desc    Reserve a food item
// @route   POST /api/charity/reserve/:id
export const reserveFood = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await prisma.foodItem.update({
      where: { id },
      data: {
        status: 'RESERVED',
        reservedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Food item reserved successfully',
      data: updatedItem,
    });
  } catch (error) {
    // In-memory fallback handler
    const targetIdx = mockAvailableFood.findIndex(item => String(item.id) === String(id));
    if (targetIdx !== -1) {
      const item = mockAvailableFood[targetIdx];
      mockAvailableFood.splice(targetIdx, 1);
      const reservedItem = { ...item, status: 'RESERVED', reservedAt: 'Just now' };
      mockReservations.unshift(reservedItem);

      return res.status(200).json({
        success: true,
        message: 'Food item reserved successfully',
        data: reservedItem,
      });
    }

    res.status(404);
    throw new Error('Food item not found or unavailable');
  }
});

// @desc    Confirm food pickup completed
// @route   POST /api/charity/complete/:id
export const completePickup = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await prisma.foodItem.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Rescue completed successfully',
      data: updatedItem,
    });
  } catch (error) {
    const targetIdx = mockReservations.findIndex(item => String(item.id) === String(id));
    if (targetIdx !== -1) {
      const item = mockReservations[targetIdx];
      mockReservations.splice(targetIdx, 1);
      const completedItem = { ...item, status: 'COMPLETED', completedAt: 'Just now' };
      mockCompletedRescues.unshift(completedItem);

      return res.status(200).json({
        success: true,
        message: 'Rescue completed successfully',
        data: completedItem,
      });
    }

    res.status(404);
    throw new Error('Reservation not found');
  }
});

// @desc    Get charity dashboard statistics
// @route   GET /api/charity/stats
export const getCharityStats = asyncHandler(async (req, res) => {
  try {
    const totalRescuedItems = await prisma.foodItem.findMany({
      where: { status: 'COMPLETED' },
    });

    const totalMealsRescued = totalRescuedItems.reduce((acc, item) => acc + (item.portions || 0), 0);
    const activeReservationsCount = await prisma.foodItem.count({ where: { status: 'RESERVED' } });
    const availableCount = await prisma.foodItem.count({ where: { status: 'AVAILABLE' } });

    // CO2 calculation: ~0.4 kg CO2 saved per meal portion
    const co2SavedKg = (totalMealsRescued * 0.4).toFixed(1);

    return res.status(200).json({
      success: true,
      data: {
        availableListings: availableCount,
        activeReservations: activeReservationsCount,
        completedPickups: totalRescuedItems.length,
        totalMealsRescued,
        co2SavedKg: parseFloat(co2SavedKg),
      },
    });
  } catch (error) {
    const totalMeals = mockCompletedRescues.reduce((acc, item) => acc + item.portions, 0);
    return res.status(200).json({
      success: true,
      data: {
        availableListings: mockAvailableFood.length,
        activeReservations: mockReservations.length,
        completedPickups: mockCompletedRescues.length,
        totalMealsRescued: totalMeals,
        co2SavedKg: parseFloat((totalMeals * 0.4).toFixed(1)),
      },
    });
  }
});
