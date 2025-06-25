import { Navigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { WithChildren } from '../../types';

const PublicRoute = ({ children }: WithChildren) => {
  const user = useAuthUser();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
