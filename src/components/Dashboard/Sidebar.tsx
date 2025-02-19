// import { Button } from '@mui/material';
// import CalculateIcon from '@mui/icons-material/Calculate';
import LogoutIcon from '@mui/icons-material/Logout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Constants from '../Constants';

const Sidebar = () => {
  const { t } = useTranslation('dashboard');
  return (
    <div
      className="z-50 hidden w-[22rem] items-center justify-between text-left sm:flex sm:h-full sm:flex-col"
      style={{ backgroundColor: '#474fef' }}
    >
      <div className="flex h-16 w-full justify-start border-b border-gray-700 py-3">
        <Link
          href="/"
          className="rounded-lg pl-6 text-2xl font-bold text-white"
        >
          {Constants.name}
        </Link>
      </div>
      <div className="h-full w-full pt-20 pl-10">
        <h2 className="text-start text-xs font-bold leading-[1.3] text-white text-opacity-50">
          {t('sidebarHeader')}
        </h2>
        <ul className="flex h-fit w-full flex-col items-start justify-center py-2 text-left text-xl font-bold text-white sm:text-base">
          {JSON.parse(
            JSON.stringify(t('datasets', { returnObjects: true }))
          ).map((set: any) => (
            <Link href={set.link} key={set.key}>
              <li className="py-4">{set.value}</li>
            </Link>
          ))}

          {/* <li className="flex items-center py-4">
            <CalculateIcon sx={{ mr: 1 }} /> Pricing Calculator
          </li> */}
        </ul>
      </div>
      <div className="flex h-16 w-full justify-start border-t border-gray-700 py-3">
        <Link
          href="/"
          className="rounded-lg pl-6 text-lg font-bold text-white focus:outline-none"
        >
          {t('logout')} <LogoutIcon sx={{ ml: 1 }} />
        </Link>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });
