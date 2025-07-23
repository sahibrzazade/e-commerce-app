import { Link } from 'react-router-dom';
import { menuItems } from '../../constants/menuItems';
import { themedBackground, themedBorder } from '../../styles/themeClassNames';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className="hidden md:flex space-x-6 items-center">
      {menuItems.map((item) =>
        item.children ? (
          <div key={item.labelKey} className="relative group/menu">
            <span className="relative pb-1 uppercase font-bold text-sm cursor-pointer flex items-center">
              {t(item.labelKey)}
              <svg
                className="ml-1 w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute left-0 -bottom-0.5 h-[3px] w-0 bg-black dark:bg-white transition-all duration-300 group-hover/menu:w-full"></span>
            </span>
            <div className={`${themedBackground} ${themedBorder} absolute left-0 top-10 flex flex-col items-start z-50 py-6 px-12 min-w-[240px] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 ease-out`}>
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className="relative pb-1 uppercase font-bold text-sm group/submenu"
                >
                  {t(child.labelKey)}
                  <span className="bg-black dark:bg-white absolute left-0 -bottom-0 h-[3px] w-0 transition-all duration-300 group-hover/submenu:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.path}
            to={item.path}
            className="relative pb-1 uppercase font-bold text-sm group"
          >
            {t(item.labelKey)}
            <span className="absolute left-0 -bottom-0.5 h-[3px] w-0 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )
      )}
    </nav>
  );
};

export default Navigation;
