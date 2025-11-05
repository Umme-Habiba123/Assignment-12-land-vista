import React from 'react';
import { RiHomeOfficeLine } from 'react-icons/ri';
import { Link } from 'react-router';

const VistaLand = () => {
    return (
        <div>
             <Link to="/" className="flex items-center gap-1 text-xl lg:text-4xl font-bold">
            <RiHomeOfficeLine size={50} />
            <span className='text-black mt-3'>Land<span className='text-red-500'>Vista</span></span>
          </Link>
        </div>
    );
};

export default VistaLand;