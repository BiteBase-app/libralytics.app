import Link from 'next/link';

import { BackToTopButton } from './Buttons';
import Constants from './Constants';

const Footer = () => {
  return (
    <footer
      className="relative w-full pt-2 text-white"
      style={{ backgroundColor: '#242434' }}
    >
      <BackToTopButton />
      <div className="flex items-center justify-center pt-3 text-sm font-bold ">
        <Link href="/" className="border-white px-3">
          Home
        </Link>
        <Link href="/privacy" className="border-l border-white px-3">
          Privacy
        </Link>
        <Link href="/tnc" className="border-l border-white pl-3">
          Terms &amp; Conditions
        </Link>
      </div>
      <div className="text-center">
        <p className="py-3 text-sm text-gray-400">
          {Constants.name} © All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
