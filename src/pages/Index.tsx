import { Navigate } from 'react-router-dom';
import { useAppStore } from '@/store/AppStore';

const Index = () => {
  const { auth } = useAppStore();
  
  if (auth.isLoggedIn) {
    return <Navigate to="/shop" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

export default Index;
