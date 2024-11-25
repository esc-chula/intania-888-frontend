import React from 'react'
import { PawPrint } from 'lucide-react'

const Playground = () => {
    return (
        <div className='flex flex-col items-center space-y-2'>
            <PawPrint color='black' width={40} height={40}/>  
            <div className="w-40 h-10 flex items-center justify-center bg-team-violet">
                <p>Violet</p>
            </div>
            <div className="w-40 h-10 flex items-center justify-center bg-team-blue">
                <p>Blue</p>
            </div>
            <div className="w-40 h-10 flex items-center justify-center bg-team-green">
                <p>Green</p>
            </div>
            <div className="w-40 h-10 flex items-center justify-center bg-team-pink">
                <p>Pink</p>
            </div>
            <div className="w-40 h-10 flex items-center justify-center bg-team-orange">
                <p>Orange</p>
            </div>
            <div className="w-40 h-10 flex items-center justify-center bg-team-yellow">
                <p>Yellow</p>
            </div>
            <div className="w-40 h-10 flex items-center justify-center bg-base-gold">
                <p>Gold</p>
            </div>
        </div>
    )
}

export default Playground