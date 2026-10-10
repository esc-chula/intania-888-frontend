"use client";
import { motion } from 'framer-motion';
import React from 'react';
interface LeverProps {
    onPullEnd: () => void;
    disabled?: boolean;
}

const Lever: React.FC<LeverProps> = ({ onPullEnd, disabled = false }) => {
    return (
        <div className="h-[200px] w-[20px] bg-gray-300 rounded-full relative flex items-start">
            <motion.div
                className={`w-[40px] h-[40px] rounded-full shadow-lg ${
                    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
                drag={disabled ? false : "y"}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.5}
                onDragEnd={() => {
                    if (!disabled) onPullEnd();
                }}
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                aria-disabled={disabled}
                style={{ backgroundColor: '#68141C' }}
                transition={{ type: 'spring', stiffness: 300, damping: 100 }}
            />
        </div>
    );
};

export default Lever;
