import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { AppRoute } from '../types';


export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/shop', element: <Shop /> }
];
