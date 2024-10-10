"use client";

import React, { useMemo } from 'react'
import { SlipResultProps } from './SlipResult';
import { Coins } from 'lucide-react';
import SlipResult from './SlipResult';

interface SlipGroupResultProps {
    slipId: string;
    netProfit: number;
    slipResult: SlipResultProps[];
}

const SlipGroupResult: React.FC<SlipGroupResultProps> = ({ slipId, netProfit, slipResult }) => {

    const netProfitColor = useMemo(() => {
        return netProfit > 0 ? 'text-green-800' : 'text-red-800';
    }, [netProfit]);

    return (
        <div>
            <section className="w-full flex items-center justify-between bg-neutral-200 p-4 rounded-t-lg h-7 text-sm">
                <p className='text-black font-semibold'>สลิปหมายเลข: {slipId.slice(0,10)}</p>
                <div className='flex items-center space-x-0.5 font-semibold'>
                    <span className={netProfitColor}>{netProfit}</span> <Coins color="yellow"/>
                </div>
            </section>
            <section className='flex flex-col items-center w-full'>
                {slipResult.map((result, index) => (
                    <div key={index} className={`w-full`}>
                        <SlipResult
                            match={result.match}
                            rate={result.rate}
                            betting_on={result.betting_on}
                            className={index === slipResult.length - 1 ? 'rounded-b-lg' : ''}
                        />
                        {index !== slipResult.length - 1 && (
                            <div className="w-full h-0.5 bg-gray-200"></div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default SlipGroupResult;
