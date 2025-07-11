import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../hooks';
import { ReLogin, Loader } from '../';

const Auth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isLoginRequired, setIsLoginRequired] = useState(false);

  const { data: user, isLoading, isError } = useUserInfo();
  const email = user?.data?.email;
  const schoolId = user?.data?.schoolId;

  // Listen for global auth expiration
  useEffect(() => {
    const handleAuthExpired = () => setIsLoginRequired(true);

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, [email, schoolId]);

  if (isError || !user) navigate('/', { replace: true });
  console.log(isError, isLoginRequired, 'isError');
  // Fallback: if user info is missing entirely, redirect
  if (isLoading) return <Loader />;

  return (
    <>
      {children}
      {isLoginRequired && (
        <ReLogin
          open={isLoginRequired}
          onClose={() => setIsLoginRequired(false)}
          email={email}
          schoolId={schoolId}
        />
      )}
    </>
  );
};

export default Auth;
