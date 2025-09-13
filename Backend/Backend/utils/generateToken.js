import jwt from 'jsonwebtoken';

export const generatePinToken = (pin) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || '90d',
  });
};