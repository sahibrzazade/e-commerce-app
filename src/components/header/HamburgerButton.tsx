import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { HamburgerButtonProps } from '../../types/index';

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <button
      className="md:hidden"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle Menu"
    >
      {isMenuOpen ? (
        <CloseOutlined className="text-gray-800 text-xl transition-transform duration-300" />
      ) : (
        <MenuOutlined className="text-gray-800 text-xl transition-transform duration-300" />
      )}
    </button>
  );
};

export default HamburgerButton;
