import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistProvider } from './contexts/wishlistContext';
import { CartProvider } from './contexts/cartContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ToastContainer />
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
