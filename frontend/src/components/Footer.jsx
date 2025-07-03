import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-28 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              We are a leading real estate platform, helping you find your dream
              property in India. From luxury apartments to affordable homes, we
              have it all.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h2 className="text-lg font-bold mb-4">Services</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Buy Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Sell Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Rent Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Consultation
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Info</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 1a9 9 0 100-18 9 9 0 000 18zM10 6a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 6zm0 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Nagpur, Maharashtra, India
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0014.999 4H5a2 2 0 00-2.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@EstateSphere.com
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.5 2a1 1 0 00-1 1v14a1 1 0 001 1h15a1 1 0 001-1V3a1 1 0 00-1-1h-15zM3 4h2v1H3V4zm2 2H3v1h2V6zm10.5 8a.5.5 0 010 1H4.5a.5.5 0 010-1h11z" />
                </svg>
                +91 88776776787
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            &copy; 2025 EstateSphere. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c-5.49 0-9.837 4.448-9.837 9.934 0 4.415 3.444 8.075 7.956 8.85.58.107.79-.25.79-.556v-2.095c-3.324.727-4.03-1.61-4.03-1.61-.528-1.335-1.287-1.692-1.287-1.692-1.056-.72.08-.705.08-.705 1.166.082 1.778 1.234 1.778 1.234 1.04 1.792 2.72 1.275 3.38.975.105-.774.408-1.276.744-1.57-2.656-.308-5.462-1.356-5.462-6.032 0-1.333.456-2.42 1.21-3.273-.12-.306-.524-1.54.108-3.216 0 0 .99-.318 3.24 1.213.94-.265 1.94-.396 2.94-.4 1 0 2 .14 2.94.4 2.25-1.531 3.24-1.213 3.24-1.213.632 1.676.228 2.91.108 3.216.754.853 1.21 1.94 1.21 3.273 0 4.687-2.81 5.716-5.475 6.024.42.36.78 1.06.78 2.136v3.17c0 .31.2.67.8.56 4.52-.78 7.96-4.44 7.96-8.85 0-5.486-4.35-9.934-9.84-9.934z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.54 6.42c-.82.37-1.7.61-2.62.72a4.6 4.6 0 002.02-2.53 8.86 8.86 0 01-2.88 1.1 4.57 4.57 0 00-7.79 4.16c0 .36.04.7.12 1.03a12.97 12.97 0 01-9.4-4.76 4.57 4.57 0 001.41 6.09c-.68-.02-1.32-.21-1.88-.52v.05c0 2.36 1.67 4.33 3.89 4.78-.41.11-.85.17-1.29.17-.32 0-.63-.03-.93-.08a4.58 4.58 0 004.27 3.18A9.2 9.2 0 010 19.53a12.93 12.93 0 007.02 2.06c8.42 0 13.02-6.97 13.02-13.02 0-.2 0-.41-.01-.61a9.29 9.29 0 002.26-2.36z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.994 4.5c-.841.37-1.748.62-2.707.733 1.02-.614 1.76-1.589 2.12-2.749-.96.57-2.02.985-3.127 1.21A4.52 4.52 0 0016.616 3a4.53 4.53 0 00-4.53 4.53c0 .35.04.69.1 1.02A12.86 12.86 0 011.6 3.25a4.49 4.49 0 001.41 6.02c-.74-.02-1.44-.22-2.06-.54v.05c0 2.38 1.69 4.36 3.93 4.82-.42.12-.87.17-1.33.17-.32 0-.63-.03-.93-.08.64 1.97 2.5 3.4 4.7 3.44a9.05 9.05 0 01-5.61 1.93c-.36 0-.72-.02-1.07-.06a12.84 12.84 0 006.93 2.02c8.31 0 12.86-6.88 12.86-12.87 0-.2-.01-.39-.02-.58a9.19 9.19 0 002.27-2.33z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
