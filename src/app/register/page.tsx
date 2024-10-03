import React from 'react'
import { Intania888Logo } from '../../../public/logos/Intania888-logo'
import Link from 'next/link'

const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center space-y-3.5'>
        <Intania888Logo />
        <p>
            ดูและทายผลการแข่งกีฬา intania game ฟรี!
            เว็บเดียวในวิศวะจุฬา แชร์กันเยอะๆ
        </p>
        <section className='flex items-center justify-center space-y-1.5'>
            <button>เริ่มต้นใช้งาน</button>
            <button>เข้าสู่ระบบ</button>
        </section>
        <p>ใช้อีเมลนิสิตจุฬาในการยืนยันตัวตน</p>
        <Link href='/condition'>ข้อกำหนดและเงื่อนไขการใช้งาน</Link>
    </div>
  )
}

export default RegisterPage;