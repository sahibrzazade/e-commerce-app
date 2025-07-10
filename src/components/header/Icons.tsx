import {
  ShoppingCartOutlined,
  HeartOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { OutlinedButton } from '../OutlinedButton';
import { useAuthUser } from '../../hooks/useAuthUser';
import { authService } from '../../services/authService';
import { showErrorMessage, showSuccessMessage } from '../../utils/toastUtils';
import { useWishlist } from '../../contexts/wishlistContext';
import { useCart } from '../../contexts/cartContext';

const Icons: React.FC = () => {

  const navigate = useNavigate();
  const user = useAuthUser();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      showSuccessMessage('Sign Out successful');
      navigate('/');
    } catch (error) {
      showErrorMessage('Sign Out failed. Please try again later.');
    }
  };

  return (
    <div className="flex items-center space-x-4 text-2xl">
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
      <div className="group">
        <GlobalOutlined className="text-gray-600 cursor-pointer" />
      </div>
      <div className="relative group">
        <UserOutlined className="text-gray-600 cursor-pointer" />
        <div className="absolute right-0 top-8 bg-black flex flex-col items-center z-50 p-6 border border-white transition-all duration-200 ease-out translate-y-0 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto">
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
                  onClick={() => navigate('/sign-in')}
                />
                <OutlinedButton
                  content="Sign Up"
                  height={40}
                  width={100}
                  fontWeight="bold"
                  onClick={() => navigate('/sign-up')}
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
