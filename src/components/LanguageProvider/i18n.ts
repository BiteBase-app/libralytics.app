import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enDashboard from '../locale/en/dashboard.json';
import enDatasets from '../locale/en/datasets.json';
import enHeader from '../locale/en/header.json';
import enLanding from '../locale/en/landing.json';
import enSignup from '../locale/en/signup.json';
import thDashboard from '../locale/th/dashboard.json';
import thDatasets from '../locale/th/datasets.json';
import thHeader from '../locale/th/header.json';
import thLanding from '../locale/th/landing.json';
import thSignup from '../locale/th/signup.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        header: enHeader,
        translation: enLanding,
        datasets: enDatasets,
        signup: enSignup,
        dashboard: enDashboard,
      },
      th: {
        header: thHeader,
        translation: thLanding,
        datasets: thDatasets,
        signup: thSignup,
        dashboard: thDashboard,
      },
    },
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
