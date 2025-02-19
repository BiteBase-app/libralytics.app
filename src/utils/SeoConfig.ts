import { AppConfig } from './AppConfig';

export const SeoConfig = {
  defaultTitle: AppConfig.title,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: AppConfig.url,
    siteName: AppConfig.site_name,
  },
  twitter: {
    handle: `@${AppConfig.twitter}`,
    site: `@${AppConfig.twitter}`,
    cardType: 'summary_large_image',
  },
};
