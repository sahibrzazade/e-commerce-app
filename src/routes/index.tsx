import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { Shop } from '../pages/Shop';
import { SignUp } from '../pages/SignUp';
import { AppRoute } from '../types';
import PublicRoute from '../components/auth/PublicRoute';
import { ProductDetails } from '../pages/ProductDetails';
import { Wishlist } from '../pages/Wishlist';


export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/wishlist', element: <Wishlist /> },
  { path: '/product/:id', element: <ProductDetails /> },
  { path: '/sign-in', element: <PublicRoute><SignIn /></PublicRoute> },
  { path: '/sign-up', element: <PublicRoute><SignUp /></PublicRoute> },
];
