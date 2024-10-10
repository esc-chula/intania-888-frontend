"use client";
import { motion } from 'framer-motion';
import React from 'react';
interface LeverProps {
    onPullEnd: () => void;
}

const Lever: React.FC<LeverProps> = ({ onPullEnd }) => {
    return (
        <div className="h-[200px] w-[20px] bg-gray-300 rounded-full relative flex items-start">
            <motion.div
                className="w-[40px] h-[40px] rounded-full shadow-lg cursor-pointer"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.5}
                onDragEnd={onPullEnd}
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                style={{ backgroundColor: '#68141C' }}
                transition={{ type: 'spring', stiffness: 300, damping: 100 }}
            />
        </div>
    );
};

export default Lever;