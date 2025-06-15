export interface HamburgerButtonProps extends MobileMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MobileMenuProps {
  isMenuOpen: boolean;
}