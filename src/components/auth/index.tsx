import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../hooks';
import { ReLogin, Loader } from '../';
import { CUSTOM_EVENT_TOKEN_EXPIRE } from '../../contants';

const Auth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isLoginRequired, setIsLoginRequired] = useState(false);

  const { data: user, isLoading, isError } = useUserInfo();
  const email = user?.data?.email;
  const schoolId = user?.data?.schoolId;

  // Listen for global auth expiration
  useEffect(() => {
    const handleAuthExpired = () => setIsLoginRequired(true);

    window.addEventListener(CUSTOM_EVENT_TOKEN_EXPIRE, handleAuthExpired);
    return () => window.removeEventListener(CUSTOM_EVENT_TOKEN_EXPIRE, handleAuthExpired);
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
