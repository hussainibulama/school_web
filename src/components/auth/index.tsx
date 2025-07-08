import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useUserInfo } from '../../hooks/useUserHook';
import { AUTH_STORAGE_KEY } from '../../contants';
const Auth = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, isError } = useUserInfo();

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !user) {
    // Invalid or expired token
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default Auth;
