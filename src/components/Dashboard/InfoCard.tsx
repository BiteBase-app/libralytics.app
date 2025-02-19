// import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

const InfoCard = ({ companyDetails }: any) => {
  const {
    imageSrc,
    imageAlt,
    title,
    description,
    pricing,
    pricingDetails,
    coverage,
    coverageDetails,
    record,
    recordDetails,
    history,
    historyDetails,
  } = companyDetails;
  return (
    <div
      key={title}
      className="grid h-fit w-full grid-cols-12 gap-4 rounded-sm bg-white p-6 shadow-sm"
    >
      <div className="col-span-2 pt-4 lg:col-span-1">
        <Image src={imageSrc} alt={imageAlt} width={100} height={100} />
      </div>
      <div className="col-span-5 flex h-full w-full flex-col items-start p-2 lg:col-span-7">
        <h2 className="text-primary text-2xl font-bold">{title}</h2>
        <p className="text-primary text-base">{description}</p>
      </div>
      <div className="col-span-5 flex w-full flex-col bg-blue-100 p-4 text-xs lg:col-span-4">
        <div className="flex flex-row py-2">
          <div className="w-1/2">
            <h3 className="text-primary font-bold">{pricing}</h3>
            <p className="text-primary">{pricingDetails}</p>
          </div>
          <div className="w-1/2">
            <h3 className="text-primary font-bold">{coverage}</h3>
            <p className="text-primary">{coverageDetails}</p>
          </div>
        </div>
        <div className="flex flex-row py-2">
          <div className="w-1/2">
            <h3 className="text-primary font-bold">{record}</h3>
            <p className="text-primary">{recordDetails}</p>
          </div>
          <div className="w-1/2">
            <h3 className="text-primary font-bold">{history}</h3>
            <p className="text-primary">{historyDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(InfoCard), { ssr: false });
