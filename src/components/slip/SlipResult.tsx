"use client";
import React from 'react'
import { MatchColorLogo } from '../match/MatchColorLogo';

export interface SlipResultProps extends React.ComponentProps<'div'> {
    date: string;
    sportType: string;
    teamAColor: string;
    teamBColor: string;
    currentRate: number;
    predictedTeam: string;
}


const SlipResult: React.FC<SlipResultProps> = ({date, sportType, teamAColor, teamBColor, currentRate, predictedTeam, className}) => {
  return (
    <div className={`${className} p-3 text-xs bg-white w-full`}>
            <div className='font-semibold text-neutral-700'>
                {date} : {sportType}
            </div>
            <div className='flex items-center space-x-2'>
                <div className='flex justify-center items-center space-x-1.5 text-black font-semibold'>
                    <div>
                        <MatchColorLogo color={teamAColor} size= "25" />
                    </div>
                    <p className='font-light'>vs</p>
                    <div>
                        <MatchColorLogo color={teamBColor} size = "25"/>
                    </div>
                </div>
                <div className='flex justify-center items-center space-x-1.5'>
                    <p className='text-indigo-700 font-semibold'>เรทที่ได้: {currentRate}</p>
                    <p className='text-indigo-700 font-semibold'>ฝั่งที่ทาย: {predictedTeam}</p>
                </div>
            </div>
        </div>
  )
}

export default SlipResult