import { Link } from 'react-router-dom';
import { menuItems } from '../../constants/menuItems';

const Navigation: React.FC = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="relative pb-1 uppercase font-bold !text-white group"
        >
          {item.label}
          <span className="absolute left-0 -bottom-0.5 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;