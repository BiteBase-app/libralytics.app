import dynamic from 'next/dynamic';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Pricing = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      {/* Page - Landing */}
      <section className="appbarMT flex h-screen w-full items-center justify-center px-6 sm:pl-0">
        <h1 className="text-primary flex items-center justify-center text-center text-[4rem] font-bold leading-[1.3] sm:text-[6rem]">
          {t('comingsoon')}
        </h1>
      </section>
      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Pricing), { ssr: false });
