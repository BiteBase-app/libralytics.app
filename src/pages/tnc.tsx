/* eslint-disable react/no-unescaped-entities */

import Constants from '@/components/Constants';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// eslint-disable-next-line import/no-named-as-default

const tnc = () => {
  return (
    <div>
      <Header />
      <div className="appbarMT bg-white px-10 pb-10">
        <div className="mx-auto flex min-h-screen flex-col items-center lg:flex-row">
          {/* <!--Left Col--> */}
          <div className="mb-5 flex w-full flex-col items-start justify-center text-left md:mb-0 lg:w-full lg:text-left">
            <h2 className="text-primary my-5 w-full text-2xl font-bold leading-10">
              Terms and Conditions for{' '}
              <span className="text-secondary">{Constants.name}</span>
            </h2>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              DISCLAIMER
            </h2>
            <p>
              Libralytics does not guarantee the accuracy, completeness, or
              timeliness of any data provided through its services. Users of our
              services agree that they assume all risk related to their use of
              the data provided by Libralytics. Libralytics is not liable for
              any damages or losses resulting from the use of its services.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              OWNERSHIP OF DATA
            </h2>
            <p>
              The data provided through Libralytics services is the sole
              property of Libralytics. Users of our services agree not to sell,
              distribute, or otherwise transfer the data to any third party
              without the written consent of Libralytics.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              USE OF DATA
            </h2>
            <p>
              Users of our services agree to use the data provided by
              Libralytics solely for their own internal business purposes. Users
              agree not to use the data for any illegal, unethical, or harmful
              purposes.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              INDEMNIFICATION
            </h2>
            <p>
              Users of our services agree to indemnify and hold harmless
              Libralytics, its officers, directors, employees, and agents from
              any claims, damages, or losses arising from their use of the data
              provided by Libralytics.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              WARRANTIES
            </h2>
            <p>
              Libralytics makes no warranties, express or implied, regarding the
              accuracy, completeness, or timeliness of the data provided through
              its services.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              LIMITATION OF LIABILITY
            </h2>
            <p>
              Libralytics is not liable for any direct, indirect, incidental,
              special, or consequential damages resulting from the use of its
              services.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              TERMINATION
            </h2>
            <p>
              Libralytics reserves the right to terminate the provision of its
              services to any user at any time for any reason.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              GOVERNING LAW
            </h2>
            <p>
              This agreement shall be governed by and construed in accordance
              with the laws of the jurisdiction in which Libralytics is
              incorporated.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              SEVERABILITY
            </h2>
            <p>
              If any provision of this agreement is found to be invalid or
              unenforceable, the remaining provisions shall remain in full force
              and effect.
            </p>
            <p>
              <br />
            </p>
            <h2 className="text-primary my-5 w-full text-xl font-bold leading-10">
              ENTIRE AGREEMENT
            </h2>
            <p>
              This agreement constitutes the entire agreement between the user
              and Libralytics and supersedes all prior agreements and
              understandings, whether written or oral.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default tnc;
