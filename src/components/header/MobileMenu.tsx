import { menuItems } from '../../constants/menuItems';
import { MobileMenuProps } from '../../types/index';

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen }) => {
  return (
    <div
      className={`md:hidden bg-white mx-4 overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'max-h-screen visible' : 'max-h-0 invisible'
      }`}
    >
      {menuItems.map((item, id) => (
        <span
          key={id}
          className="block py-2 bg-black text-primary-light"
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default MobileMenu;
