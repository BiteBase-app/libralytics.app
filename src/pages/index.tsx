import { Divider, useMediaQuery } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import ColoredButton, { UnColoredButton } from '@/components/Buttons';
import Footer from '@/components/Footer';
import {
  GridCardWithIcon,
  GridElement,
  GridImages,
  GridSteps,
} from '@/components/Grid';
import Header from '@/components/Header';
import Images from '@/components/Images';

const Index = () => {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery('(min-width:600px)');

  const variants = isDesktop
    ? {
        initial: {
          opacity: 0,
          x: 200,
        },
        animate: {
          opacity: 1,
          x: 0,
        },
      }
    : {
        initial: {
          opacity: 0,
          y: 100,
        },
        animate: {
          opacity: 1,
          y: 0,
        },
      };

  const variantsFade = isDesktop
    ? {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }
    : {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      };

  const [sec2Top, sec2TopInView] = useInView({ triggerOnce: true });
  const [sec2Bot, sec2BotInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [sec3Top, sec3TopInView] = useInView({ triggerOnce: true });
  const [sec4Top, sec4TopInView] = useInView({ triggerOnce: true });
  const [sec5Top, sec5TopInView] = useInView({ triggerOnce: true });
  const animation = useAnimation();
  const animSec2Bot = useAnimation();
  const animSec3Top = useAnimation();
  const animSec4Top = useAnimation();
  const animSec5Top = useAnimation();

  // Animate Section 2
  React.useEffect(() => {
    if (sec2TopInView) {
      animation.start(variants.animate);
    }
    if (!sec2TopInView) {
      animation.start(variants.initial);
    }
  }, [sec2TopInView]);

  React.useEffect(() => {
    if (sec2BotInView) {
      animSec2Bot.start(variantsFade.animate);
    }
    if (!sec2BotInView) {
      animSec2Bot.start(variantsFade.initial);
    }
  }, [sec2BotInView]);

  // Animate Section 3
  React.useEffect(() => {
    if (sec3TopInView) {
      animSec3Top.start(variants.animate);
    }
    if (!sec3TopInView) {
      animSec3Top.start(variants.initial);
    }
  }, [sec3TopInView]);

  // Animate Section 4
  React.useEffect(() => {
    if (sec4TopInView) {
      animSec4Top.start({ opacity: 1, y: 0 });
    }
    if (!sec4TopInView) {
      animSec4Top.start({ opacity: 0, y: 100 });
    }
  }, [sec4TopInView]);

  // Animate Section 5
  React.useEffect(() => {
    if (sec5TopInView) {
      animSec5Top.start({ opacity: 1, y: 0 });
    }
    if (!sec5TopInView) {
      animSec5Top.start({ opacity: 0, y: 100 });
    }
  }, [sec5TopInView]);

  return (
    <div>
      <Header />
      {/* Page - Landing */}
      <section className="appbarMT flex h-full w-full flex-col items-center justify-center px-6 sm:pl-0">
        <div className="h-full w-full flex-col pt-10 sm:grid sm:grid-cols-12 sm:pt-20">
          {/* Left Col */}
          <div className="relative flex flex-col items-center justify-center text-left sm:col-span-7 sm:h-fit sm:items-start sm:pl-10 md:col-span-6 md:pl-10">
            <motion.h1
              variants={variants}
              initial={variants.initial}
              animate={variants.animate}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-primary mb-5 items-center text-start text-[2.1rem] font-bold leading-[1.3] sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {t('landingHeader')}
            </motion.h1>
            <motion.h3
              variants={variants}
              initial={variants.initial}
              animate={variants.animate}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-primary text-lg sm:text-xl"
            >
              {t('landingSubHeader')}
            </motion.h3>
            <div className="mt-10 grid w-full grid-flow-row grid-cols-1 items-start justify-start gap-2 sm:w-10/12 sm:grid-cols-2 md:w-9/12 lg:w-8/12">
              <ColoredButton text={t('landingButton1')} link="/contact" />
              <UnColoredButton
                text={t('landingButton2')}
                link="https://libralytics-x.web.app/console/"
              />
            </div>
          </div>
          {/* Right Col */}
          <div className="hidden items-center justify-center sm:col-span-7 sm:mx-10 sm:block sm:h-full sm:pr-4 sm:pt-0 md:col-span-6">
            <Image src={Images.cloud} alt="cloud" width="700" height="458" />
          </div>
        </div>

        {/* Company Highlights */}
        <div className="h-fit w-full flex-col items-start justify-start py-16 md:pl-10">
          <div className="grid grid-cols-2 grid-rows-2 items-start justify-start gap-2 sm:flex sm:flex-row">
            {JSON.parse(
              JSON.stringify(t('landingHighlights', { returnObjects: true }))
            ).map((link: any) => (
              <div
                className="text-primary border-l border-solid border-gray-400 px-4 pt-1 sm:py-2 sm:pt-0"
                key={link.key}
              >
                <h3 className="text-xl font-bold">{link.number}</h3>
                <p className="pt-2 pb-1 font-light">{link.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page - Offering */}
      <section
        className="flex h-fit w-full flex-col justify-start py-10 sm:px-10 sm:py-14 md:py-16"
        style={{ backgroundColor: '#242434' }}
      >
        <div className="grid h-fit w-full grid-flow-row px-6 sm:grid-cols-12 sm:px-0">
          {/* Left Col */}
          <div
            ref={sec2Top}
            className="relative flex flex-col items-start text-left sm:col-span-5 sm:h-full sm:items-center"
          >
            <motion.h1
              animate={animation}
              transition={{ duration: 0.4, delay: 0 }}
              className="mb-5 items-center text-start text-[2.1rem] font-bold leading-[1.3] text-white sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {t('dataHeader')}
            </motion.h1>
            <motion.h3
              animate={animation}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xl text-white"
            >
              {t('dataSubHeader')}
            </motion.h3>
          </div>
          {/* right col */}
          <div className="flex items-center justify-center pt-6 sm:col-span-7 sm:mx-10 sm:h-full sm:pt-0">
            <Image src={Images.code} alt="companies" width="500" height="350" />
          </div>
        </div>
        {/* Offering Qualities */}
        <Divider
          className="pt-10 sm:hidden"
          sx={{ borderBottom: 1, borderColor: 'grey.600' }}
        />
        ;
        <motion.div
          ref={sec2Bot}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex h-fit w-full flex-col px-6 sm:grid sm:grid-cols-12 sm:gap-10 sm:px-0"
        >
          {JSON.parse(
            JSON.stringify(t('dataQualities', { returnObjects: true }))
          ).map((quality: any, index: number) => (
            <GridCardWithIcon
              key={quality.header}
              id={quality.header}
              image={`/${quality.image}`}
              imgAlt={quality.header}
              header={quality.header}
              body={quality.body}
              animation={animSec2Bot}
              delay={index * 0.25}
              duration={1}
            />
          ))}
        </motion.div>
      </section>

      {/* How is our Data used? */}
      <section className="flex h-fit w-full flex-col justify-start py-10 sm:px-10 sm:py-14 md:py-16">
        <div
          ref={sec3Top}
          className="flex w-full flex-col px-6 sm:w-1/2 sm:px-0"
        >
          <motion.h1
            animate={animSec3Top}
            transition={{ duration: 0.4, delay: 0 }}
            className="text-primary mb-5 items-center text-start text-2xl font-bold leading-[1.3] sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {t('dataUseCaseHeader')}
          </motion.h1>
          <motion.h3
            animate={animSec3Top}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-primary text-base sm:text-xl"
          >
            {t('dataUseCaseSubHeader')}
          </motion.h3>
        </div>
        <div className="flex h-fit w-full flex-col items-center justify-center gap-4 px-6 py-4 sm:grid sm:grid-cols-2 sm:px-0 sm:py-10">
          {JSON.parse(
            JSON.stringify(t('dataUseCases', { returnObjects: true }))
          ).map((dataUseCase: any) => (
            <GridElement
              key={dataUseCase.key}
              id={dataUseCase.key}
              image={`/${dataUseCase.image}`}
              imgAlt={dataUseCase.value}
              text={dataUseCase.value}
            />
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-partners h-fit w-full px-6 sm:px-10">
        <motion.h1
          ref={sec4Top}
          animate={animSec4Top}
          transition={{ duration: 0.4, delay: 0 }}
          className="mb-5 items-center pt-12 text-center text-xl font-bold leading-[1.3] text-white sm:text-3xl"
        >
          {t('partnerHeader')}
        </motion.h1>
        <div className="grid h-full w-full grid-cols-1 grid-rows-3 items-center justify-center gap-4 pb-10 pt-2 sm:grid-cols-3 sm:grid-rows-1">
          {JSON.parse(
            JSON.stringify(t('partners', { returnObjects: true }))
          ).map((partner: any) => (
            <GridImages
              key={partner.key}
              id={partner.key}
              image={`/${partner.image}`}
              imgAlt={partner.value}
              link={partner.link}
            />
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-steps h-fit w-full py-10">
        <motion.h1
          ref={sec5Top}
          animate={animSec5Top}
          transition={{ duration: 0.4, delay: 0 }}
          className="mb-5 items-center pt-6 text-center text-2xl font-bold leading-[1.3] text-white sm:pt-12 sm:text-3xl"
        >
          {t('stepsHeader')}
        </motion.h1>
        <div className="grid h-fit w-full grid-cols-1 grid-rows-3 items-start justify-start gap-4 px-6 py-4 sm:grid-cols-3 sm:grid-rows-1 sm:px-14 sm:py-10">
          {JSON.parse(JSON.stringify(t('steps', { returnObjects: true }))).map(
            (step: any) => (
              <GridSteps
                key={step.key}
                id={step.key}
                number={step.number}
                header={step.header}
                body={step.body}
              />
            )
          )}
        </div>
      </section>

      {/* Sales */}
      <section
        className="flex h-fit w-full flex-col justify-start py-10 sm:px-10 sm:py-14 md:py-16"
        style={{ backgroundColor: '#FFFFFF' }}
      >
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
              {t('salesHeader')}
            </h1>
            <h3 className="text-primary h-fit w-full py-2 text-lg sm:text-xl">
              {t('salesSubHeader')}
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

export default dynamic(() => Promise.resolve(Index), { ssr: false });
