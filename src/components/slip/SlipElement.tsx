"use client";
import React, { useState } from 'react'
import { X } from 'lucide-react';
import { MatchColorLogo } from '../match/MatchColorLogo';
import { Selector } from './SlipSelector';
interface SlipElementProps {
    date: string;
    sportType: string;
    teamAColor: string;
    teamBColor: string;
    currentRate: number;
}

const SlipElement: React.FC<SlipElementProps> = ({
    date,
    sportType,
    teamAColor,
    teamBColor,
    currentRate,
}) => {

    const [selectedTeam, setSelectedTeam] = useState("เลือกทีม");
    return (
        <div className='p-1.5 text-xs bg-white w-full'>
            <div className='flex items-center justify-end'>
                <X color='black' className='w-3.5 h-3.5' />
            </div>
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
                    <Selector
                        choicesList={[teamAColor, teamBColor]}
                        mainFilter='เลือกทีม'
                        filter={selectedTeam}
                        setFilter={setSelectedTeam}
                    />
                    <p className='text-indigo-700 font-semibold'>เรทปัจจุบัน: {currentRate}</p>
                </div>
            </div>
        </div>
    )
}

export default SlipElement