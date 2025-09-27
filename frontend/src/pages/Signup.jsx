import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  // ✅ validate function
  const validateForm = () => {
    if (!formData.name.trim()) return toast.error('Full name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    return true;
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await signup(formData);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center  p-4'>
      <div className='w-full max-w-md p-8 rounded-2xl shadow-lg bg-base-300'>
        <h1 className='text-3xl font-bold text-center mb-6 text-white tracking-wide'>
          TalkTrade
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Full Name */}
          <input
            type='text'
            placeholder='Full Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='w-full px-4 py-2 rounded-lg bg-[#2C2C2C] text-white 
            placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#03DAC5]'
          />

          {/* Email */}
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className='w-full px-4 py-2 rounded-lg bg-[#2C2C2C] text-white 
            placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#03DAC5]'
          />

          {/* Password */}
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='w-full px-4 py-2 rounded-lg bg-[#2C2C2C] text-white 
              placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#03DAC5]'
            />
            <button
              type='button'
              className='absolute right-3 top-2 text-sm text-[#03DAC5] cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={isSigningUp}
            className='w-full py-2 mt-4 rounded-lg font-medium bg-[#03DAC5] text-[#121212] 
            hover:bg-[#02c2ad] transition-colors duration-200 disabled:opacity-50 cursor-pointer'
          >
            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className='flex items-center my-6'>
          <div className='flex-1 h-px bg-[#2C2C2C]'></div>
          <p className='px-3 text-sm text-[#B0B0B0]'>OR</p>
          <div className='flex-1 h-px bg-[#2C2C2C]'></div>
        </div>

        <p className='text-center text-sm text-[#B0B0B0] cursor-pointer'>
          Already have an account?{' '}
          <a href='/login' className='text-[#03DAC5] hover:underline'>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
