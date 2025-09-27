import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: '1d' } // options
  );
  res.cookie('jwt', token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'DEVELOPMENT',
  });
  return token;
};
