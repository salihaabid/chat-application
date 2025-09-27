import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { generateToken } from '../config/utils.js';
import { v2 as cloudinary } from 'cloudinary';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ----------------- SIGNUP -----------------

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exists or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        // 409 Conflict
        success: false,
        message: 'User already exists',
      });
    }

    // validating email and password format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        // 400 Bad Request
        success: false,
        message: 'Please enter a valid email',
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        // 400 Bad Request
        success: false,
        message: 'Please enter a strong password',
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        // 201 Created
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        // 400 Bad Request
        success: false,
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    console.log('error in signup controller', error.message);
    res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: error.message,
    });
  }
};

// ----------------- LOGIN -----------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        // 404 Not Found
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      generateToken(user._id, res);
      res.status(200).json({
        // 200 OK
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      res.status(401).json({
        // 401 Unauthorized
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: error.message,
    });
  }
};

// ----------------- LOGOUT -----------------
export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({
      // 200 OK
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: error.message,
    });
  }
};

// ----------------- UPDATE PROFILE -----------------

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile pic is required' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('error in update profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// ----------------- CHECK AUTH -----------------

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log('Error in checkAuth controller', error.message);
    res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: error.message,
    });
  }
};
