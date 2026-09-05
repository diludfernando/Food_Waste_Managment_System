import prisma from './prisma.js';

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma Database Connected Successfully');
  } catch (error) {
    console.error(`Prisma DB Connection Error: ${error.message}`);
  }
};
