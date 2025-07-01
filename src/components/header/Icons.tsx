import {
  ShoppingCartOutlined,
  HeartOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { OutlinedButton } from '../OutlinedButton';
import { useState } from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { authService } from '../../services/authService';
import { showSuccessMessage } from '../../utils/toastUtils';
import { useWishlist } from '../../contexts/wishlistContext';

const Icons: React.FC = () => {

  const navigate = useNavigate();
  const user = useAuthUser();
  const { count: wishlistCount } = useWishlist();

  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      showSuccessMessage('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="flex items-center space-x-4 text-2xl">
      <div className="relative">
        <HeartOutlined onClick={() => navigate('/wishlist')} className="text-gray-600 cursor-pointer" />
        {user && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {wishlistCount}
          </span>
        )}
      </div>
      <ShoppingCartOutlined className="text-gray-600 cursor-pointer" />
      <GlobalOutlined className="text-gray-600 cursor-pointer" />
      <div
        className="relative"
        onMouseEnter={() => setUserMenuOpen(true)}
        onMouseLeave={() => setUserMenuOpen(false)}
      >
        <UserOutlined className="text-gray-600 cursor-pointer" />
        <div className={`absolute right-0 bg-black flex flex-col items-center z-50 p-6 border border-white transition-all duration-200 ease-out translate-y-0 ${userMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {user ? (
            <>
              <span className="text-white text-sm mb-4">Welcome back, {user.displayName}!</span>
              <div className="flex flex-row gap-2">
                <OutlinedButton
                  content="Profile"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => navigate('/profile')}
                />
                <OutlinedButton
                  content="Logout"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={handleLogout}
                />
              </div>
            </>
          ) : (
            <>
              <span className="text-white text-sm mb-4">You're not signed in</span>
              <div className="flex flex-row gap-2">
                <OutlinedButton
                  content="Login"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => navigate('/login')}
                />
                <OutlinedButton
                  content="Register"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => navigate('/register')}
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
