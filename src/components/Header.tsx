// import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import Constants from './Constants';

const Header = () => {
  const { t } = useTranslation('header');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChangeComplete = () => {
      const element = document.getElementById('services');
      if (element && element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div className="fixed top-0 z-30 w-full bg-white px-4 sm:px-10">
      <div className="flex w-full items-center justify-start sm:flex-row sm:justify-between">
        <div className="flex w-full justify-start py-3 sm:w-fit sm:shrink-0 sm:justify-between">
          <Link
            href="/"
            className="text-primary rounded-lg text-xl font-bold tracking-tight focus:outline-none sm:text-3xl"
          >
            {Constants.name}
          </Link>
        </div>
        <div className="hidden grow items-center justify-center lg:block">
          <nav className="flex grow flex-wrap items-center pl-4">
            {JSON.parse(
              JSON.stringify(t('headerLinks', { returnObjects: true }))
            ).map((link: any) => (
              <ul className="px-4 pt-1 hover:text-blue-600" key={link.key}>
                <Link href={link.href}>{link.value}</Link>
              </ul>
            ))}
          </nav>
        </div>
        <div className="hidden w-0 justify-center sm:block sm:w-fit sm:shrink-0 sm:items-center">
          <nav className="w-full grow flex-col items-center justify-end pl-10">
            <ul className="flex grow items-center justify-end">
              <button
                onClick={() => changeLanguage('en')}
                style={{
                  backgroundColor:
                    language === 'en' ? '#4750EF' : 'transparent',
                  color: language === 'en' ? '#fff' : '#4750EF',
                }}
                className="text-secondary cursor-pointer items-center rounded-sm p-2 px-4 font-bold transition duration-100 ease-in-out hover:bg-blue-500 hover:text-white"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('th')}
                style={{
                  backgroundColor:
                    language === 'th' ? '#4750EF' : 'transparent',
                  color: language === 'th' ? '#fff' : '#4750EF',
                }}
                className="text-secondary cursor-pointer items-center rounded-sm p-2 px-4 font-bold transition duration-100 ease-in-out hover:bg-indigo-600 hover:text-white"
              >
                TH
              </button>
              <li className="px-2">
                <Link
                  // href="mailto:admin@libralytics.app?subject=Request%20Details&amp;body=Hi,%0A%0AI%20am%20interested%20in%20your%20services.%0A%0APlease%20share%20more%20details.%0A%0AThanks"
                  href="/contact"
                  className="text-secondary cursor-pointer items-center rounded-sm px-4 py-2 font-bold transition duration-100 ease-in-out hover:bg-indigo-600 hover:text-white"
                >
                  {t('callToAction1')}
                </Link>
              </li>
              {/* <li className="px-2">
                <Link
                  href="/dashboard/signup"
                  className="text-secondary cursor-pointer items-center rounded-sm px-4 py-2 font-bold transition duration-100 ease-in-out hover:bg-blue-500 hover:text-white"
                >
                  {t('callToAction2')}
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
        <Box
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          className="w-fit justify-end"
        >
          <IconButton
            size="large"
            aria-label="pages"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {JSON.parse(
              JSON.stringify(t('headerLinks', { returnObjects: true }))
            ).map((link: any) => (
              <MenuItem component="a" href={link.href} key={link.key}>
                <Typography textAlign="center">{link.value}</Typography>
              </MenuItem>
            ))}
            <MenuItem
              component="a"
              href="/contact"
              // href="mailto:admin@libralytics.app?subject=Request%20Details&amp;body=Hi,%0A%0AI%20am%20interested%20in%20your%20services.%0A%0APlease%20share%20more%20details.%0A%0AThanks"
            >
              <Typography
                textAlign="center"
                style={{
                  fontWeight: 'bold',
                  color: '#4750EF',
                }}
              >
                {t('callToAction1')}
              </Typography>
            </MenuItem>
            {/* <MenuItem component="a" href="/dashboard/signup">
              <Typography
                textAlign="center"
                style={{
                  fontWeight: 'bold',
                  color: '#4750EF',
                }}
              >
                {t('callToAction2')}
              </Typography>
            </MenuItem> */}
            <Divider />
            <MenuItem
              sx={{ width: '100%' }}
              component="button"
              onClick={() => changeLanguage('en')}
            >
              <Typography
                textAlign="center"
                style={{
                  fontWeight: 'bold',
                  backgroundColor: i18n.language === 'en' ? '#4750EF' : '',
                  color: i18n.language === 'en' ? '#fff' : '',
                  minWidth: '100%',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                EN
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{ width: '100%' }}
              component="button"
              onClick={() => changeLanguage('th')}
            >
              <Typography
                textAlign="center"
                style={{
                  fontWeight: 'bold',
                  backgroundColor: i18n.language === 'th' ? '#4750EF' : '',
                  color: i18n.language === 'th' ? '#fff' : '',
                  minWidth: '100%',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                TH
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
