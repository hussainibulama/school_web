import { useEffect, useState, ReactNode, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../hooks';
import { ReLogin, Loader, FinishSetup } from '..';
import { CUSTOM_EVENT_TOKEN_EXPIRE } from '../../contants';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isLoginRequired, setIsLoginRequired] = useState(false);

  const { data: user, isLoading } = useUserInfo();
  const email = user?.data?.email;
  const schoolId = user?.data?.schoolId;

  // Listen for global auth expiration
  useEffect(() => {
    const handleAuthExpired = () => {
      if (!email || !schoolId) {
        navigate('/login', { replace: true });
        return;
      }
      setIsLoginRequired(true);
    };

    window.addEventListener(CUSTOM_EVENT_TOKEN_EXPIRE, handleAuthExpired);
    return () => window.removeEventListener(CUSTOM_EVENT_TOKEN_EXPIRE, handleAuthExpired);
  }, [email, schoolId, navigate]);

  useEffect(() => {
    if (!email && !isLoading) {
      navigate('/login', { replace: true });
    }
  }, [email, navigate, isLoading]);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {children}
      {isLoginRequired && (
        <ReLogin
          open={isLoginRequired}
          onClose={() => setIsLoginRequired(false)}
          email={email}
          schoolId={schoolId}
        />
      )}
      <FinishSetup />
    </Fragment>
  );
};

export default AuthWrapper;
