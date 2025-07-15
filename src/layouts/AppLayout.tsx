import { WithChildren } from '../types';
import { Header } from './Header';
import { Footer } from './Footer';
import { themedBackground, themedText } from '../styles/themeClassNames';
const AppLayout: React.FC<WithChildren> = ({ children }) => {
  return (
    <div className={`${themedBackground} ${themedText} flex flex-col min-h-screen`}>
      <Header />
      <main className="h-full px-4 shadow">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
