import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import ColoredButton from '@/components/Buttons';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Images from '@/components/Images';

const Datasets = () => {
  const { t } = useTranslation('datasets');
  const { t: tLanding } = useTranslation('translation');
  return (
    <div>
      <Header />
      {/* Page - Alternative Data */}
      <section className="appbarMT flex h-full w-full flex-col items-center justify-center px-6 sm:py-10 sm:pl-0">
        <div className="flex h-full w-full flex-col pt-10 sm:grid sm:grid-cols-12">
          {/* Left Col */}
          <div className="flex flex-col items-center justify-center text-left sm:col-span-7 sm:h-full sm:items-start sm:pl-10 md:col-span-6 md:pl-10">
            <h1 className="text-primary mb-5 items-center text-start text-[2.1rem] font-bold leading-[1.3] sm:text-3xl md:text-4xl lg:text-5xl">
              {t('datasetHeader')}
            </h1>
            <h3 className="text-primary text-lg sm:text-xl">
              {t('datasetSubheader')}
            </h3>
            <div className="mt-10 grid h-fit w-full grid-flow-row grid-cols-1 items-center justify-start gap-2 sm:w-10/12 sm:grid-cols-2 md:w-9/12 lg:w-8/12">
              <ColoredButton text={t('datasetButton')} link="/contact" />
            </div>
          </div>
          {/* Right Col */}
          <div className="hidden items-center justify-center sm:col-span-6 sm:flex sm:h-full sm:pr-4">
            <Image
              src={Images.dataset}
              alt="dataset"
              width="700"
              height="458"
            />
          </div>
        </div>
      </section>

      {/* Page - Data Categories */}
      <section className="flex h-full w-full flex-col items-start bg-white py-8 px-6 sm:px-0 sm:py-20">
        <div className="flex flex-col items-center justify-center text-left sm:items-start sm:pl-10">
          <h1 className="text-primary mb-5 items-center text-start text-[2.1rem] font-bold leading-[1.3] sm:text-3xl md:text-4xl lg:text-5xl">
            {t('categoriesHeader')}
          </h1>
          <h3 className="text-primary text-lg sm:text-xl">
            {t('categoriesSubheader')}
          </h3>
        </div>
        <div className="grid h-full w-full grid-flow-row grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:grid-rows-4 sm:gap-6 sm:px-10 sm:pt-6">
          {JSON.parse(
            JSON.stringify(t('categories', { returnObjects: true }))
          ).map((category: any) => {
            const categoryName = Object.keys(category)[0] || '';
            const categoryData = category[categoryName][0] || '';
            const categoryList =
              categoryData[Object.keys(categoryData)[1] || ''];
            if (categoryName && categoryData && categoryList) {
              return (
                <div
                  key={categoryName}
                  className="checkmark flex h-full w-full flex-col items-start justify-start p-6 text-left sm:p-8"
                  style={{ backgroundColor: '#F3F2FB' }}
                >
                  <div key={categoryData.header} className="leading-[1.3]">
                    <h2 className="text-primary py-2 text-lg font-bold sm:text-3xl">
                      {categoryData.header}
                    </h2>
                    {categoryList.map((listItem: any) => (
                      <div
                        key={listItem.value}
                        className="flex flex-row items-center justify-start py-1"
                      >
                        <Image
                          src={Images.checkmark}
                          alt="checkmark"
                          width="20"
                          height="20"
                        />
                        <div className="text-primary pl-2 text-base font-semibold">
                          {listItem.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null; // or handle the case where data is undefined or not properly formatted
          })}
        </div>
      </section>

      {/* Sales */}
      <section className="flex h-fit w-full flex-col justify-start py-10 sm:px-10 sm:py-14">
        <div className="grid h-fit w-full grid-flow-row px-6 sm:grid-cols-12 sm:px-0">
          {/* Mobile View - Image */}
          <div className="flex items-center justify-center py-4 sm:hidden">
            <Image
              src={Images.dashboard}
              alt="companies"
              width="700"
              height="458"
            />
          </div>
          {/* Left Col */}
          <div className="flex h-full w-full flex-col items-start justify-start sm:col-span-6">
            <h1 className="text-primary mb-5 flex h-fit w-full justify-start text-start text-[2.1rem] font-bold leading-[1.3] sm:text-5xl">
              {tLanding('salesHeader')}
            </h1>
            <h3 className="text-primary h-fit w-full py-2 text-lg sm:text-xl">
              {tLanding('salesSubHeader')}
            </h3>
            <ul className="checkmark text-primary flex h-fit w-full flex-col items-start py-2 text-left text-lg sm:text-xl">
              {JSON.parse(
                JSON.stringify(t('demos', { returnObjects: true }))
              ).map((demo: any) => (
                <li key={demo.key} className="py-2">
                  {demo.value}
                </li>
              ))}
            </ul>
            <div className="flex h-fit w-full justify-center py-10 sm:justify-start">
              <div className="w-1/2">
                <ColoredButton
                  text={t('salesButton')}
                  link="https://libralytics-x.web.app/console/"
                />
              </div>
            </div>
          </div>
          {/* right col */}
          <div className="text-primary hidden items-center justify-center pt-6 pl-10 sm:col-span-6 sm:flex sm:h-full sm:pt-0">
            <Image
              src={Images.dashboard}
              alt="companies"
              width="700"
              height="458"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Datasets), { ssr: false });
