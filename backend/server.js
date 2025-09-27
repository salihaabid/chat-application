import express from 'express';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.config.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDB from './config/mongodb.config.js';
import cors from 'cors';
import { app, server } from './config/socket.js';
// import path from 'path';

dotenv.config();
// const app = express();

const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
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

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
//   });
// }

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
