import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { HamburgerButtonProps } from '../../types/index';
import { useTheme } from '../../contexts/themeContext';

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {

  const { theme } = useTheme();

  const themedIcon = {
    color: theme === 'light' ? 'black' : 'white',
  };

  return (
    <button
      className="md:hidden"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle Menu"
    >
      {isMenuOpen ? (
        <CloseOutlined style={themedIcon} className="text-xl transition-transform duration-300" />
      ) : (
        <MenuOutlined style={themedIcon} className="text-xl transition-transform duration-300" />
      )}
    </button>
  );
};

export default HamburgerButton;
