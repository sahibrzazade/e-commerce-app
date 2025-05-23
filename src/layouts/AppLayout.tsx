import { WithChildren } from '../types';
import { Header } from './Header';
import { Footer } from './Footer';
const AppLayout: React.FC<WithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="h-full px-4 bg-black shadow">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
