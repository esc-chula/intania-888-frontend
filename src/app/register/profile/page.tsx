"use client";
import React from 'react'
import { Intania888Logo } from '../../../../public/logos/Intania888-logo'
import Link from 'next/link'
import { Selector } from '@/components/Selector'

const RegisterProfile = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5 text-white h-screen'>
        <div className='w-72 h-16'>
            <Intania888Logo />
        </div>
        <div className='flex items-center justify-center flex-col font-semibold space-y-5'>
            <div className='w-full space-y-3'>
              <p>ชื่อ</p>
              <input className='w-full h-12 w-80 bg-white rounded-md text-black pl-3 font-light rounded-xl' type='text' placeholder='ชื่อเล่น'/>
            </div>
            <div className='w-full space-y-3'>
              <p>กรุ๊ป</p>
              <Selector
                mainFilter='--เลือกกรุ๊ป--'
                filter='--เลือกกรุ๊ป--'
                setFilter={() => {}}
              />
            </div>
        </div>
        <section className='flex flex-col items-center justify-center space-y-1.5 font-semibold'>
            <Link className='flex justify-center items-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] w-64 h-11 rounded-md' href="/">เริ่มต้นใช้งาน</Link>
        </section>
    </div>
  )
}

export default RegisterProfile