// import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import Constants from '../Constants';

const Header = () => {
  return (
    <div
      className="flex w-full items-center justify-between border-b border-gray-700 px-2 py-3 sm:hidden"
      style={{ backgroundColor: '#474fef' }}
    >
      <div className="flex justify-start">
        <Link
          href="/"
          className="rounded-lg pl-2 text-2xl font-bold text-white"
        >
          {Constants.name}
        </Link>
      </div>
      <div className="flex justify-start">
        <Link
          href="/"
          className="rounded-lg text-sm font-bold text-white focus:outline-none"
        >
          <LogoutIcon />
        </Link>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
