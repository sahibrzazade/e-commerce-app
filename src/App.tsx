import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTopButton from './components/ScrollToTopButton';
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';

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
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
