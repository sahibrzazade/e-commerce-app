import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistProvider } from './contexts/wishlistContext';
import { CartProvider } from './contexts/cartContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTopButton from './components/ScrollToTopButton';
import { ThemeProvider } from "./contexts/themeContext";
import { LanguageProvider } from "./contexts/languageContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <ToastContainer />
                <ScrollToTop />
                <ScrollToTopButton />
                <Routes>
                  {appRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
