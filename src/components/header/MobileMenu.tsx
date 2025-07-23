import { useTranslation } from 'react-i18next';
import { menuItems } from '../../constants/menuItems';
import { themedBackground } from '../../styles/themeClassNames';
import { MobileMenuProps } from '../../types/index';
import { Link } from 'react-router-dom';

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();

  const flatMenu = menuItems.flatMap(item =>
    item.children ? item.children : [item]
  );

  return (
    <div
      className={`${themedBackground} md:hidden mx-4 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen visible' : 'max-h-0 invisible'
        }`}
    >
      {flatMenu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="block py-3 px-4 text-lg"
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
