import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all required fields');
  }

  // Placeholder response
  res.status(201).json({
    success: true,
    message: 'User registered successfully (placeholder)',
    user: { name, email, role: role || 'donor' },
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please include email and password');
  }

  // Placeholder response
  res.status(200).json({
    success: true,
    message: 'User logged in successfully (placeholder)',
    token: 'sample_jwt_token',
  });
});
