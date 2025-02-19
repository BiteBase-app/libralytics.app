import CookieConsent from 'react-cookie-consent';

const Cookies = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I Understand"
      cookieName="AllIsWell"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      declineButtonStyle={{ background: 'black', fontSize: '13px' }}
      expires={150}
      enableDeclineButton
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default Cookies;
