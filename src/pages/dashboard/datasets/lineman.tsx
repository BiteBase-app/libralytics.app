import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import DownloadButton from '@/components/Dashboard/Download';
import Header from '@/components/Dashboard/Header';
import InfoCard from '@/components/Dashboard/InfoCard';
import Sidebar from '@/components/Dashboard/Sidebar';
import CustomTable from '@/components/Dashboard/Table';

const Lineman = () => {
  const { t } = useTranslation('dashboard');

  return (
    <div className="h-screen w-full">
      {/* Page - Landing */}
      <section className="flex h-full w-full flex-col items-center justify-between sm:flex-row">
        {/* Mobile Header */}
        <Header />
        {/* Sidebar */}
        <Sidebar />

        {/* Mobile Content */}
        <div className="text-primary flex h-full w-full items-center justify-center text-center text-2xl font-bold sm:hidden">
          {t('mobileMessage')}
        </div>

        {/* Desktop Content */}
        <div className="hidden h-full w-full flex-col sm:block">
          {/* Banner */}
          <div className="fixed top-0 left-1 z-10 flex h-12 w-full translate-x-32 flex-row items-center justify-center gap-6 bg-green-100">
            <h3 className="text-primary text-sm font-bold">{t('banner')}</h3>
            <Link
              href="/contact"
              className="text-secondary flex cursor-pointer items-center rounded-sm border border-solid border-indigo-700 py-1 px-3 text-center text-sm font-bold transition duration-100 ease-in-out hover:bg-indigo-600 hover:text-white"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Content */}
          <div className="flex h-full w-full grow flex-col items-center justify-start overflow-y-scroll px-8 pt-20">
            {/* Info Card */}
            <InfoCard companyDetails={t('lineman', { returnObjects: true })} />

            {/* Data Sample */}
            <div className="my-8 flex h-fit w-full flex-col rounded-sm bg-white p-6 shadow-sm">
              <div className="flex flex-row items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="text-primary text-lg font-bold">
                  {t('sample')}
                </h2>
                <DownloadButton
                  fileName="libralytics_app_lineman"
                  fileUrl="/assets/files/lineman.csv"
                />
              </div>
              <div className="h-full w-full overflow-hidden">
                <CustomTable csvFilePath="/assets/files/lineman.csv" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Lineman), { ssr: false });
