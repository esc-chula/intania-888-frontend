"use client";

import React from 'react'
import { handleGoogleLogin } from '@/api/auth/google'

const GoogleLoginButton = () => {
  return (
    <button onClick={handleGoogleLogin} className='flex justify-center items-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] w-64 h-11 rounded-md'>เริ่มต้นใช้งาน</button>
  )
}

export default GoogleLoginButton