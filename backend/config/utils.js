// import jwt from 'jsonwebtoken';

// export const generateToken = (userId, res) => {
//   const token = jwt.sign(
//     { userId }, // payload
//     process.env.JWT_SECRET, // secret key
//     { expiresIn: '1d' } // options
//   );
//   res.cookie('jwt', token, {
//     maxAge: 1 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV !== 'DEVELOPMENT',
//   });
//   return token;
// };

import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    // sameSite: process.env.NODE_ENV === 'DEVELOPMENT' ? 'lax' : 'none',
    // secure: process.env.NODE_ENV !== 'DEVELOPMENT',
    sameSite: 'none',
    secure: true,
  });

  return token;
};
