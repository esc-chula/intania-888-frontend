import React from 'react';
import { Intania888Logo } from '../../../../public/logos/Intania888-logo';
import Link from 'next/link';

const ConditionPage = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5 text-white h-screen'>
      <div className='w-72 h-16'>
        <Intania888Logo />
      </div>
      <p className='text-xl font-bold'>ข้อกำหนดและเงื่อนไขการใช้งาน</p>
      <div className='flex items-center justify-center flex-col font-semibold space-y-5'>
        <ol className='list-decimal space-y-2 font-light max-w-80 text-sm'>
          <li>เว็บไซต์นี้เป็นส่วนหนึ่งของกิจกรรม Intania Games 2024 ซึ่งเป็นงานแข่งขันกีฬาสีของคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</li>
          <li>กิจกรรมสามารถเข้าร่วมได้เพียงนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัยเท่านั้น</li>
          <li>
            sภายในเกมนั้นเป็นเหรียญที่จำลองขึ้นเพื่อใช้ในการเก็บคะแนนในกิจกรรม ซึ่งไม่มีการใช้จ่ายเงินจริงแต่เพื่ออย่างใด
          </li>
          <li>
            กิจกรรมนี้ไม่ได้มีความประสงค์ในการสนับสนุนการพนัน แต่มีขึ้นเพื่อส่งเสริมการเข้าร่วมกิจกรรมเพื่อกระชับความสัมพันธ์
          </li>
        </ol>
      </div>
      <section className='flex flex-col items-center justify-center space-y-1.5 font-semibold'>
        <Link
          className='flex justify-center items-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] w-64 h-11 rounded-md'
          href='/register'
        >
          ย้อนกลับ
        </Link>
      </section>
    </div>
  );
};

export default ConditionPage;
