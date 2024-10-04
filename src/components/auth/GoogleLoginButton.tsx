"use client";

import React from 'react'
import { handleGoogleLogin } from '@/api/auth/google'

const GoogleLoginButton = () => {
  return (
    <button onClick={handleGoogleLogin} className='flex justify-center items-center bg-neutral-200 text-black w-64 h-11 rounded-md'>เข้าสู่ระบบ</button>
  )
}

export default GoogleLoginButton