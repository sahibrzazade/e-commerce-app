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

const Icons: React.FC = () => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const user = useAuthUser();

  return (
    <div className="flex items-center space-x-4 text-2xl">
      <HeartOutlined className="text-gray-600 cursor-pointer" />
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
                  onClick={async () => {
                    try {
                      await authService.logout();
                      navigate('/');
                    } catch (error) {
                      console.log('Logout failed', error);
                    }
                  }}
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
