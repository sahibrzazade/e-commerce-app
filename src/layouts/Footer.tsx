import { BsBox2 } from 'react-icons/bs';
import { FaCreditCard, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div>
      <div className="flex items-center bg-black justify-center text-white w-full px-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 gap-6 border-t border-gray-700">
          <div className="flex items-center justify-center">
            <span
              className="text-white text-8xl" style={{ fontFamily: 'Gochi Hand, cursive' }}>
              Cartly
            </span>
          </div>
          <div className="flex items-center lg:justify-center">
            <BsBox2 className="w-[62px] h-[62px]" />
            <span className="pl-3 font-bold text-sm">
              {'FREE SHIPPING & RETURN POLICY'}
            </span>
          </div>

          <div className="flex items-center lg:justify-center">
            <TfiHeadphoneAlt className="w-[62px] h-[62px]" />
            <span className="pl-3 font-bold text-sm">{'90-DAY WARRANTY'}</span>
          </div>

          <div className="flex items-center lg:justify-center">
            <FaCreditCard className="w-[62px] h-[62px]" />
            <span className="pl-3 font-bold text-sm">
              {'NEW PRODUCT OFFERINGS '}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full bg-black text-white px-4">
        <footer className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-gray-700 py-6">
          <div className="mb-6 flex items-center justify-center md:justify-start">
            {/* <Link to="/">
              <img src="" alt="Logo" width="200" height="72" />
            </Link> */}
          </div>

          <div className="mb-6">
            <ul className="flex flex-col space-y-3 text-white">
              <li className="flex items-center">
                <FaLocationDot />
                <span className="ml-2">868 Fake Street, New York</span>
              </li>
              <li className="flex items-center">
                <FaPhone />
                <span className="ml-2">(+00) 000-1234-5678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope />
                <span className="ml-2">example.info@gmail.com</span>
              </li>
              <li className="flex items-center space-x-4 pt-2">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
                <FaLinkedin />
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">
              About us
            </h5>
            <ul className="flex flex-col space-y-2 text-white">
              <li>
                <Link
                  className="hover:text-orange-400 transition duration-300"
                  to="/shop"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">
              About us
            </h5>
            <ul className="flex flex-col space-y-2 text-white">
              <li>
                <Link
                  className="hover:text-orange-400 transition duration-300"
                  to="/about-us"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-400 transition duration-300"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-400 transition duration-300"
                  to="/blogs"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-400 transition duration-300"
                  to="/faq"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};
