import { useState } from 'react';
import Logo from '../components/header/Logo';
import Navigation from '../components/header/Navigation';
import Icons from '../components/header/Icons';
import HamburgerButton from '../components/header/HamburgerButton';
import MobileMenu from '../components/header/MobileMenu';
import { themedBackground } from '../styles/themeClassNames';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className={`${themedBackground} w-full shadow-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <Navigation />
        <div className="hidden md:flex">
          <Icons />
        </div>
        <HamburgerButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} />
    </header>
  );
};
