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
import { themedBorder, themedBackground } from '../../styles/themeClassNames';
import { useTheme } from '../../contexts/themeContext';
import { useTranslation } from 'react-i18next';

const Icons: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount, cartProducts, removeFromCart, clearCart, clearLoading, removeLoading, total } = useCart();
  const { language, changeLanguage, loading: languageLoading } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const themedIcon = {
    color: theme === 'light' ? 'black' : 'white',
  };

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
      showSuccessMessage(t("auth.sign-out-successful"));
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      showErrorMessage(t("auth.sign-out-failed"));
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
          showName={false}
        />
      </div>

      <div className="relative group">
        <HeartOutlined
          style={themedIcon}
          onClick={() => navigate('/wishlist')}
          className="cursor-pointer" />
        {user && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {wishlistCount}
          </span>
        )}
      </div>
      <div className="relative group">
        <ShoppingCartOutlined
          style={themedIcon}
          onClick={() => navigate('/cart')}
          className="text-gray-600 cursor-pointer" />
        {user && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {cartCount}
          </span>
        )}
        {user && (
          <div className={`${themedBorder} ${themedBackground} absolute right-0 top-8 flex flex-col items-center z-50 p-6 border transition-all duration-200 ease-out ${isUserMenuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
            } group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto`}>
            <>
              <div className="w-64 max-h-80 overflow-y-auto flex flex-col gap-2 mb-4">
                {cartProducts.length === 0 ? (
                  <span className="text-sm text-gray-500 text-center">{t("common:your-cart-is-empty")}</span>
                ) : (
                  cartProducts.map(({ id, quantity, product }) => (
                    <div key={id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                      <div className="flex items-center gap-2">
                        {product?.image && (
                          <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                        )}
                        <span className="text-sm font-medium">{product?.name}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-600">{t("common:quantity")}: {quantity}</span>
                        <span className="text-xs font-semibold">${product?.price ? (product.price * quantity).toFixed(2) : '--'}</span>
                        <button
                          className="text-red-500 text-xs hover:underline cursor-pointer transition-all mt-1 disabled:opacity-50"
                          title="Remove"
                          disabled={removeLoading}
                          onClick={async () => {
                            try {
                              await removeFromCart(id);
                            } catch (e) {
                              showErrorMessage();
                            }
                          }}
                        >
                          {t("common:remove")}
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {cartProducts.length !== 0 &&
                  <span className='text-sm inline-block text-end font-bold'>{t("common:total")}: ${total}</span>
                }
              </div>
              <div className="flex flex-row gap-2 w-full items-center justify-center">
                {cartProducts.length !== 0 ?
                  <>
                    <OutlinedButton
                      content={t("common:clear-cart")}
                      height={40}
                      width={100}
                      fontWeight="bold"
                      onClick={async () => {
                        try {
                          await clearCart();
                          showErrorMessage(t("common:cart-cleared"));
                        } catch (e) {
                          showErrorMessage();
                        }
                      }}
                      isDisabled={clearLoading}
                    />

                    <OutlinedButton
                      content={t("common:go-to-cart")}
                      height={40}
                      width={100}
                      fontWeight="bold"
                      onClick={() => handleNavigation('/cart')}
                    />
                  </>
                  :
                  <OutlinedButton
                    content={t("common:go-to-shop")}
                    height={40}
                    fontWeight="bold"
                    onClick={() => handleNavigation('/shop')}
                  />
                }

              </div>
            </>
          </div>
        )}
      </div>
      <div className="relative group" ref={userMenuRef}>
        <UserOutlined
          style={themedIcon}
          className="text-gray-600 cursor-pointer"
          onClick={toggleUserMenu}
        />
        <div className={`${themedBorder} ${themedBackground} absolute right-0 top-8 flex flex-col items-center z-50 p-6 border transition-all duration-200 ease-out ${isUserMenuOpen
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
          } group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto`}>
          {user ? (
            <>
              <span className="text-sm mb-4">{t("common:welcome-back")}, {user.displayName}!</span>
              <div className="flex flex-row gap-2">
                <OutlinedButton
                  content={t("common:profile")}
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => handleNavigation('/profile')}
                />
                <OutlinedButton
                  content={t("common:sign-out")}
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={handleSignOut}
                />
              </div>
            </>
          ) : (
            <>
              <span className="text-sm mb-4">{t("auth.you-are-not-signed-in")}</span>
              <div className="flex flex-row gap-2">
                <OutlinedButton
                  content={t("common:sign-in")}
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => handleNavigation('/sign-in')}
                />
                <OutlinedButton
                  content={t("common:sign-up")}
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
