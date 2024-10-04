import React from 'react'
import { Intania888Logo } from '../../../public/logos/Intania888-logo'
import Link from 'next/link'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton'

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5 text-white h-screen'>
        <div className='w-72 h-16'>
            <Intania888Logo />
        </div>
        <div className='flex items-center justify-center flex-col font-semibold'>
            <p>ดูและทายผลการแข่งกีฬา intania game ฟรี!</p>
            <p>เว็บเดียวในวิศวะจุฬา แชร์กันเยอะๆ</p>
        </div>
        <section className='flex flex-col items-center justify-center space-y-1.5 font-semibold'>
            <Link className='flex justify-center items-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] w-64 h-11 rounded-md' href="/">เริ่มต้นใช้งาน</Link>
            <GoogleLoginButton />
        </section>
        <p className='text-xs'>ใช้อีเมลนิสิตจุฬาในการยืนยันตัวตน</p>
        <Link href='/register/condition' className='text-sm underline cursor-pointer'>ข้อกำหนดและเงื่อนไขการใช้งาน</Link>
    </div>
  )
}

export default RegisterPage;