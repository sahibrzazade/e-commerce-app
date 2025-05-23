import { Home } from '../pages/Home';
import { AppRoute } from '../types';


export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
];
