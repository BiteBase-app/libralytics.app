import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';
import type { TagManagerArgs } from 'react-gtm-module';
import TagManager from 'react-gtm-module';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/components/LanguageProvider/i18n';
import SEOtags from '@/components/SEOtags';
import { SeoConfig } from '@/utils/SeoConfig';

function MyApp({ Component, pageProps }: AppProps) {
  const tagManagerArgs: TagManagerArgs = {
    gtmId: 'G-3JH78EP3KY',
  };
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    i18n.changeLanguage(locale || defaultLocale || 'en');
  }, [locale, defaultLocale]);

  return (
    <>
      <DefaultSeo {...SeoConfig} />
      <SEOtags />
      <I18nextProvider i18n={i18n}>
        <div className="flex h-screen w-screen flex-col">
          <main className="mb-auto" style={{ backgroundColor: '#F3F2FB' }}>
            <Component {...pageProps} />
          </main>
        </div>
      </I18nextProvider>
    </>
  );
}

export default MyApp;
