/* eslint-disable no-console */
import { Box, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Constants from '@/components/Constants';

const messageMaxChar = 500;

function validateInputFields(clientDetails: any, setFormData: Function) {
  const { email, name, phone, message } = clientDetails;
  const errorMessages: {
    email?: string;
    name?: string;
    phone?: string;
    message?: string;
  } = {};

  // Email validation using regex
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    errorMessages.email = 'Invalid email address';
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      validateEmail: errorMessages.email,
    }));
  }

  // Name validation using regex
  const nameRegex = /^[A-Za-z\s-]+$/;
  if (!nameRegex.test(name)) {
    errorMessages.name = 'Invalid name';
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      validateName: errorMessages.name,
    }));
  }

  // Phone validation using regex
  const phoneRegex = /^[\d-\s]+$/;
  if (!phoneRegex.test(phone)) {
    errorMessages.phone = 'Invalid phone number';
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      validatePhone: errorMessages.phone,
    }));
  }

  // Message validation
  if (message.length > messageMaxChar) {
    errorMessages.message = 'Message must be less than 400 characters';
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      validateMessage: errorMessages.message,
    }));
  }

  // Check for any error messages
  if (Object.keys(errorMessages).length > 0) {
    // If there are error messages, update state with the error messages
    // setFormData((prevFormData: any) => ({ ...prevFormData, ...errorMessages }));
    return false;
  }

  // All input fields are valid
  return true;
}

function sendFirebaseRequest(clientDetails: any) {
  return fetch('/api/firebase', {
    method: 'POST',
    body: JSON.stringify({
      email: clientDetails.email,
      name: clientDetails.name,
      phone: clientDetails.phone,
      message: clientDetails.message,
    }),
  });
}

function sendTelegramRequest(clientDetails: any) {
  return fetch('/api/telegram', {
    method: 'POST',
    body: JSON.stringify({
      email: clientDetails.email,
      name: clientDetails.name,
      phone: clientDetails.phone,
      message: clientDetails.message,
    }),
  });
}

function checkResponse(response: any, serviceName: string) {
  if (!response.ok) {
    console.error(`${serviceName} request failed`);
  }
}

async function saveClient(clientDetails: any, setFormData: Function) {
  // Validate input fields
  if (!validateInputFields(clientDetails, setFormData)) {
    // Return or display error message
    return;
  }

  try {
    const requests = [];
    const responseServices: any = [];

    requests.push(sendFirebaseRequest(clientDetails));
    responseServices.push('Firebase');

    requests.push(sendTelegramRequest(clientDetails));
    responseServices.push('Telegram');

    const responses = await Promise.all(requests);
    responses.forEach((response, index) => {
      checkResponse(response, responseServices[index]);
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const Contact = () => {
  const { t } = useTranslation('signup');

  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    phone: '',
    message: '',
    validateEmail: '',
    validateName: '',
    validatePhone: '',
    validateMessage: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submittedName, setSubmittedName] = React.useState('');

  const handleChange = (e: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    // Prevent form submission
    e.preventDefault();

    // Reset error messages
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      validateEmail: '',
      validateName: '',
      validatePhone: '',
      validateMessage: '',
    }));

    // Perform input validation
    const isValid = validateInputFields(formData, setFormData);

    if (isValid) {
      try {
        setIsSubmitting(true);
        await saveClient(formData, setFormData);
        setIsSubmitting(false);
        setSubmitted(true);

        // Set submitted name
        setSubmittedName(formData.name);

        // Reset form data after successful submission
        setFormData({
          email: '',
          name: '',
          phone: '',
          message: '',
          validateEmail: '',
          validateName: '',
          validatePhone: '',
          validateMessage: '',
        });
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
            {Constants.name}
          </h1>
          <div className="flex flex-col items-start justify-start pl-10">
            <h2 className=" pt-8 text-left text-[1.1rem] font-bold leading-[1.3] text-white sm:text-3xl">
              {t('header')}
            </h2>
            <ul className="white-checkmark flex h-fit w-full flex-col items-start py-2 text-left text-lg text-white sm:text-base">
              {JSON.parse(
                JSON.stringify(t('demos', { returnObjects: true }))
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
              <div className="flex h-fit w-full flex-col items-center justify-center bg-white py-4 shadow-md sm:w-[30rem] sm:py-10 sm:px-0">
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
                    error={formData.validatePhone !== ''}
                    required
                    id="phone"
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  <TextField
                    error={formData.validateMessage !== ''}
                    helperText={`max ${messageMaxChar} characters`}
                    id="message"
                    name="message"
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={3}
                    onChange={handleChange}
                    value={formData.message}
                  />
                </Box>
                <div className="flex w-11/12 py-2 sm:w-10/12">
                  {isSubmitting ? (
                    <div className="flex w-full cursor-pointer flex-row items-center justify-center rounded-sm border border-solid border-indigo-500 bg-indigo-300 px-4 py-3 text-center font-bold text-white">
                      <CircularProgress size={20} sx={{ mr: 2 }} />
                      {t('submitting')}
                    </div>
                  ) : null}
                  {!isSubmitting ? (
                    <button
                      onClick={handleSubmit}
                      className="block w-full cursor-pointer items-center rounded-sm border border-solid border-indigo-500 bg-indigo-600 px-4 py-3 text-center font-bold text-white transition duration-100 ease-in-out hover:bg-indigo-700"
                    >
                      {t('submit')}
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
          {submitted ? (
            <>
              <div className="flex h-fit w-full flex-col items-center justify-center bg-white py-4 shadow-md sm:w-[30rem] sm:py-10 sm:px-0">
                <h3 className="px-4 text-center text-xl font-bold leading-[1.3] text-gray-800 sm:px-10 sm:text-xl">
                  Hi {submittedName}! {t('postSubmit')}
                </h3>

                <p className="text-primary py-2 px-6 text-center text-sm">
                  {t('explore')}
                </p>
                <Link
                  href="https://libralytics-x.web.app/console/"
                  className="cursor-pointer bg-indigo-500  py-1 px-3 text-base font-bold text-white transition-all duration-200 ease-in-out hover:bg-indigo-700"
                >
                  {t('sampleData')}
                </Link>
              </div>
            </>
          ) : null}
          <Link
            href={'/'}
            className="block cursor-pointer pb-10 text-sm font-bold leading-[1.3] text-indigo-600 sm:hidden"
          >
            {t('home')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Contact), { ssr: false });
