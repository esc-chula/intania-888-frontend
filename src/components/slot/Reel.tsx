"use client";
import { motion } from 'framer-motion';
import React from 'react';

interface ReelProps {
    reelSymbols: string[];
    spinning: boolean;
}

const Reel: React.FC<ReelProps> = ({ reelSymbols, spinning }) => {
    return (
        <div className="overflow-hidden h-[75px] w-[70px] flex items-center justify-center relative bg-white shadow-lg">
            <motion.div
                animate={{
                    y: spinning ? [-500, 0] : 0, // Start at -600 for spinning animation and center at 0
                }}
                transition={{
                    duration: 1,
                    repeat: spinning ? Infinity : 0,
                    ease: 'linear',
                }}
                className="flex flex-col items-center justify-center"
            >
                {reelSymbols.map((symbol, index) => (
                    <div
                        key={index}
                        className="h-[60px] w-[60px] flex items-center justify-center text-4xl"
                    >
                        {symbol}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Reel;
