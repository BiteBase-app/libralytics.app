import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function GridCardWithIcon(props: {
  id: string;
  image: any;
  imgAlt: string;
  header: string;
  body: string;
  animation: any;
  delay: number;
  duration: number;
}) {
  const { id, image, imgAlt, header, body, animation, delay, duration } = props;
  return (
    <motion.div
      key={id}
      animate={animation}
      transition={{ delay, duration }}
      className="flex w-full flex-col items-start justify-start py-4 text-start sm:col-span-4 sm:py-10 sm:px-0"
    >
      <Image
        className="hidden sm:block"
        src={image}
        alt={imgAlt}
        width="35"
        height="35"
      />
      <div className="flex flex-row items-center justify-center sm:hidden">
        <Image src={image} alt={imgAlt} width="35" height="35" />
        <h1 className="pl-4 text-xl font-bold text-white">{header}</h1>
      </div>
      <h1 className="hidden pt-4 text-2xl font-bold text-white sm:block">
        {header}
      </h1>
      <h3 className="pt-4 text-base text-white">{body}</h3>
    </motion.div>
  );
}

export function GridElement({ id, image, imgAlt, text }: any) {
  const { t } = useTranslation();
  return (
    <div
      key={id}
      className="flex h-32 w-full flex-col items-center justify-between bg-white py-2 px-4 sm:col-span-1 sm:h-20 sm:flex-row sm:pt-0"
    >
      <div className="flex flex-col items-center sm:w-3/4 sm:flex-row">
        <Image src={image} alt={imgAlt} width="50" height="50" />
        <h4 className="text-primary mt-1 text-lg font-bold sm:mt-0 sm:pl-4">
          {text}
        </h4>
      </div>
      <div className="mt-1 flex flex-row items-center justify-end pl-6 sm:w-1/4 sm:pl-0">
        <Link href="/datasets">
          <h5 className="text-secondary text-base font-bold sm:hidden">
            {t('dataUseCaseDetailButton')}
          </h5>
        </Link>
        <Link href="/datasets">
          <ChevronRightIcon sx={{ color: '#4750EF', fontSize: 28 }} />
        </Link>
      </div>
    </div>
  );
}

export function GridImages(props: {
  id: string;
  image: any;
  imgAlt: string;
  link: string;
}) {
  const { id, image, imgAlt, link } = props;
  return (
    <Link
      key={id}
      href={link}
      target="_blank"
      className="flex h-full w-full items-center justify-center border border-solid py-10"
    >
      <Image src={image} alt={imgAlt} height={200} width={250} />
    </Link>
  );
}

export function GridSteps(props: {
  id: string;
  number: string;
  header: string;
  body: string;
}) {
  const { id, number, header, body } = props;
  return (
    <div
      key={id}
      className="steps-border flex flex-col items-start justify-center px-6 py-4 sm:px-0 sm:py-10"
    >
      <div className="flex flex-row items-center justify-center px-4 pt-4">
        <p className="text-6xl font-extrabold text-white sm:text-[7rem]">
          {number}
        </p>
        <h3 className="pl-4 text-2xl font-bold text-white sm:text-3xl">
          {header}
        </h3>
      </div>
      <p className="px-4 text-base text-white">{body}</p>
    </div>
  );
}
