import { Home } from '../pages/Home';
import NotFound from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { Shop } from '../pages/Shop';
import { SignUp } from '../pages/SignUp';
import { AppRoute } from '../types';
import { ProductDetails } from '../pages/ProductDetails';
import { Wishlist } from '../pages/Wishlist';
import { Cart } from '../pages/Cart';
import { Profile } from '../pages/Profile';
import PublicRoute from '../components/auth/PublicRoute';
import { OrderDetails } from '../pages/OrderDetails';
import { Blogs } from '../pages/Blogs';
import BlogDetails from '../pages/BlogDetails';
import { AboutUs } from '../pages/AboutUs';
import { ContactUs } from '../pages/ContactUs';
import { Faq } from '../pages/Faq';

export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/wishlist', element: <Wishlist /> },
  { path: '/cart', element: <Cart /> },
  { path: '/shop/:id', element: <ProductDetails /> },
  { path: '/profile', element: <Profile /> },
  { path: '/orders/:orderId', element: <OrderDetails /> },
  { path: '/sign-in', element: <PublicRoute><SignIn /></PublicRoute> },
  { path: '/sign-up', element: <PublicRoute><SignUp /></PublicRoute> },
  { path: '/blogs', element: <Blogs /> },
  { path: '/blogs/:id', element: <BlogDetails /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/contact', element: <ContactUs /> },
  { path: '/faq', element: <Faq /> },
  { path: '*', element: <NotFound /> },
];
