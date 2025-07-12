import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { OutlinedButton } from '../OutlinedButton';
import { useAuthUser } from '../../hooks/useAuthUser';
import { authService } from '../../services/authService';
import { showErrorMessage, showSuccessMessage } from '../../utils/toastUtils';
import { useWishlist } from '../../contexts/wishlistContext';
import { useCart } from '../../contexts/cartContext';
import { useLanguage } from '../../contexts/languageContext';
import { LanguageSelect } from '../LanguageSelect';
import { Language } from '../../types/language';

const Icons: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthUser();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();
  const { language, changeLanguage, loading: languageLoading } = useLanguage();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      showSuccessMessage('Sign Out successful');
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      showErrorMessage('Sign Out failed. Please try again later.');
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 text-2xl">
      <div className="group">
        <LanguageSelect
          value={language}
          onChange={(value) => changeLanguage(value as Language)}
          disabled={languageLoading}
          height="32px"
          showName={false}
        />
      </div>
      <div className="relative group">
        <HeartOutlined onClick={() => navigate('/wishlist')} className="text-gray-600 cursor-pointer" />
        {user && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {wishlistCount}
          </span>
        )}
      </div>
      <div className="relative group">
        <ShoppingCartOutlined onClick={() => navigate('/cart')} className="text-gray-600 cursor-pointer" />
        {user && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {cartCount}
          </span>
        )}
      </div>
      <div className="relative group" ref={userMenuRef}>
        <UserOutlined
          className="text-gray-600 cursor-pointer"
          onClick={toggleUserMenu}
        />
        <div className={`absolute right-0 top-8 bg-black flex flex-col items-center z-50 p-6 border border-white transition-all duration-200 ease-out ${isUserMenuOpen
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
        } group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto`}>
          {user ? (
            <>
              <span className="text-white text-sm mb-4">Welcome back, {user.displayName}!</span>
              <div className="flex flex-row gap-2">
                <OutlinedButton
                  content="Profile"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => handleNavigation('/profile')}
                />
                <OutlinedButton
                  content="Sign Out"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={handleSignOut}
                />
              </div>
            </>
          ) : (
            <>
              <span className="text-white text-sm mb-4">You're not signed in</span>
              <div className="flex flex-row gap-2">
                <OutlinedButton
                  content="Sign In"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => handleNavigation('/sign-in')}
                />
                <OutlinedButton
                  content="Sign Up"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => handleNavigation('/sign-up')}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Icons;
