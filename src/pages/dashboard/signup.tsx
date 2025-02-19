import { Box, TextField } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Constants from '@/components/Constants';

const Pricing = () => {
  const { t } = useTranslation('signup');
  const { t: tLanding } = useTranslation();

  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    phone: '',
    validateEmail: '',
    validateName: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const handleChange = (e: any) => {
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.email === '') {
      setFormData({ ...formData, validateEmail: 'Email is required' });
    }
    if (formData.name === '') {
      setFormData({ ...formData, validateName: 'Name is required' });
    }
    if (formData.email !== '' || formData.name !== '') {
      // Perform form submission logic here
      try {
        setIsSubmitting(true);

        setIsSubmitting(false);

        setSubmitted(true);
        // Reset form data after successful submission
        setFormData({ ...formData, email: '', name: '', phone: '' });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div>
      {/* Page - Landing */}
      <section className="flex h-screen w-full flex-col items-center justify-between sm:flex-row">
        {/* Sidebar */}
        <div className="bg-sidebar hidden w-[30rem] items-start justify-between text-left sm:flex sm:h-full sm:flex-col">
          <h1 className="pl-10 pt-8 text-start text-[2.1rem] font-bold leading-[1.3] text-white sm:text-3xl">
            {Constants.name} {isSubmitting ? '...' : ''}
          </h1>
          <div className="flex flex-col items-start justify-start pl-10">
            <h2 className=" pt-8 text-left text-[1.1rem] font-bold leading-[1.3] text-white sm:text-3xl">
              {t('header')}
            </h2>
            <ul className="white-checkmark flex h-fit w-full flex-col items-start py-2 text-left text-lg text-white sm:text-base">
              {JSON.parse(
                JSON.stringify(tLanding('demos', { returnObjects: true }))
              ).map((demo: any) => (
                <li key={demo.key} className="py-2">
                  {demo.value}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={'/'}
            className="pl-10 pb-10 text-start text-[1.1rem] font-bold leading-[1.3] text-white sm:text-lg"
          >
            {t('home')}
          </Link>
        </div>

        {/* Page Content */}
        <div className="flex h-full w-full flex-col items-center justify-between px-6 sm:grow sm:justify-center sm:px-0">
          <h1 className="text-primary block pt-8 text-start text-2xl font-bold leading-[1.3] sm:hidden">
            {Constants.name}
          </h1>
          {!submitted ? (
            <>
              <div className="flex h-96 w-full flex-col items-center justify-center bg-white shadow-md sm:w-[30rem] sm:px-0">
                <h3 className="mb-6 text-center text-xl font-bold leading-[1.3] text-gray-800 sm:text-2xl">
                  {t('topic')}
                </h3>
                <Box
                  component="form"
                  autoComplete="on"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '91.666667%', sm: '83.333333%' },
                    '& .MuiTextField-root': {
                      marginY: 1,
                    },
                  }}
                >
                  <TextField
                    error={formData.validateEmail !== ''}
                    required
                    id="email"
                    name="email"
                    label="Work email"
                    variant="outlined"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <TextField
                    error={formData.validateName !== ''}
                    required
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </Box>
                <div className="flex w-11/12 py-2 sm:w-10/12">
                  <button
                    onClick={handleSubmit}
                    className="block w-full cursor-pointer items-center rounded-sm border border-solid border-indigo-500 bg-indigo-600 px-4 py-3 text-center font-bold text-white transition duration-100 ease-in-out hover:bg-indigo-700"
                  >
                    {t('submit')}
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-center pb-10 pt-0 text-sm font-bold leading-[1.3] sm:pb-0 sm:pt-8">
                <p className="text-primary pr-2 text-sm font-bold leading-[1.3]">
                  {t('existingAccount')}
                </p>
                <button className=" cursor-pointer text-indigo-600">
                  {t('login')}
                </button>
              </div>
            </>
          ) : null}
          {submitted ? (
            <>
              <div className="flex h-96 w-full flex-col items-center justify-center bg-white shadow-md sm:w-[30rem] sm:px-0">
                <h3 className="px-4 text-center text-xl font-bold leading-[1.3] text-gray-800 sm:px-10 sm:text-xl">
                  {t('postSubmit')}
                </h3>

                <p className="text-primary py-2 px-6 text-center text-sm">
                  {t('explore')}
                </p>
                <Link
                  href="/"
                  className="cursor-pointer text-sm font-bold text-indigo-600"
                >
                  {t('Homepage')}
                </Link>
              </div>
            </>
          ) : null}
          <button className="block cursor-pointer pb-10 text-sm font-bold leading-[1.3] text-indigo-600 sm:hidden">
            {t('home')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Pricing), { ssr: false });
