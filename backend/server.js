// import express from 'express';
// import dotenv from 'dotenv';
// import connectCloudinary from './config/cloudinary.config.js';
// import cookieParser from 'cookie-parser';
// import authRoutes from './routes/auth.route.js';
// import messageRoutes from './routes/message.route.js';
// import connectDB from './config/mongodb.config.js';
// import cors from 'cors';
// import { app, server } from './config/socket.js';
// // import path from 'path';

// dotenv.config();
// // const app = express();

// const PORT = process.env.PORT || 5000;
// // const __dirname = path.resolve();
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'https://chat-application-ten-kohl.vercel.app', // frontend on Vercel
//     ],
//     credentials: true,
//   })
// );

// connectCloudinary();

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.get('/', (req, res) => {
//   res.send('✅ Backend is running on Vercel');
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/messages', messageRoutes);

// server.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
//   connectDB();
// });

// server.js

// ----------------------------------------------------------------------------------------------------------

// import express from 'express';
// import dotenv from 'dotenv';
// import connectCloudinary from './config/cloudinary.config.js';
// import cookieParser from 'cookie-parser';
// import authRoutes from './routes/auth.route.js';
// import messageRoutes from './routes/message.route.js';
// import connectDB from './config/mongodb.config.js';
// import cors from 'cors';
// import { app, server } from './config/socket.js';

// dotenv.config();

// const PORT = process.env.PORT || 5000;
// const CLIENT_URL = process.env.CLIENT_URL;

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: [CLIENT_URL, 'http://localhost:5173'], // allow frontend local + vercel
//     credentials: true,
//   })
// );

// connectCloudinary();

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.get('/', (req, res) => {
//   res.send('✅ Backend is running on Vercel');
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/messages', messageRoutes);

// server.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
//   connectDB();
// });

// ----------------------------------------------------------------------------------------------------------

import express from 'express';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.config.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDB from './config/mongodb.config.js';
import cors from 'cors';
import { app, server } from './config/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173', // local frontend
  process.env.CLIENT_URL, // deployed frontend (Vercel)
].filter(Boolean); // removes undefined if env vars aren’t set
console.log('Allowed origins:', allowedOrigins);
// ✅ Normal CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

connectCloudinary();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('✅ Backend is running on Vercel');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
