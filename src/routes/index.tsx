import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Shop } from '../pages/Shop';
import { Register } from '../pages/Register';
import { AppRoute } from '../types';
import PublicRoute from '../components/auth/PublicRoute';
import { ProductDetails } from '../pages/ProductDetails';


export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/product/:id', element: <ProductDetails /> },
  { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
  { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
];
