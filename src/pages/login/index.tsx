import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Stack, useTheme, useMediaQuery } from '@mui/material';
import { AuthLayout } from '../../components';
import { Formik, FormikHelpers } from 'formik';
import { AUTH_STORAGE_KEY, AUTH_EMAIL_PERSIST_KEY } from '../../contants';
import { LoginForm, NeedHelp } from '../../container';
import { useInitUser, useLogin } from '../../hooks';
import { useSnackbar } from '../../hoc';
import { LoginSchema } from '../../schema';
import { LoginPayload } from '../../interface';

interface LoginValues extends LoginPayload {
  rememberMe: boolean;
}

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [schools, setSchools] = useState<any[]>([]);
  const hasSchools = schools.length > 0;

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const { mutate: initializeEmail, isPending: isInitializing } = useInitUser();
  const { mutate: loginUser, isPending: isLoggingIn } = useLogin();

  const handleSubmit = (values: LoginValues, actions: FormikHelpers<LoginValues>) => {
    if (values.rememberMe) {
      //Persist email rememberMe
      localStorage.setItem(AUTH_EMAIL_PERSIST_KEY, values?.email);
    }
    if (hasSchools) {
      // Login flow
      loginUser(values, {
        onSuccess: (res) => {
          localStorage.setItem(AUTH_STORAGE_KEY, res?.data?.token);
          showSnackbar(res?.message || 'Success', 'success');
          actions.resetForm();
          navigate('/dashboard');
        },
        onError: (err) => {
          console.error(err);
          showSnackbar(err?.response?.data?.message || 'Error', 'error');
        },
        onSettled: () => actions.setSubmitting(false),
      });
    } else {
      // School initialization flow
      initializeEmail(values.email, {
        onSuccess: (res) => {
          showSnackbar('User found, please select school to proceed', 'success');
          setSchools(res.data ?? []);
        },
        onError: (err) => {
          console.error(err);
          showSnackbar(err?.response?.data?.message || 'Error', 'error');
        },
        onSettled: () => actions.setSubmitting(false),
      });
    }
  };

  const rememberEmail = localStorage.getItem(AUTH_EMAIL_PERSIST_KEY);

  return (
    <AuthLayout title='Log in to your account'>
      {/* Main Content */}
      <Stack
        spacing={5}
        direction={isMobile ? 'column' : 'row'}
        width='100%'
        justifyContent='center'
        alignItems='stretch'
      >
        {/* Form */}
        <Box width='100%'>
          <Formik
            enableReinitialize
            initialValues={{
              email: rememberEmail || '',
              password: '',
              schoolId: '',
              rememberMe: !!rememberEmail,
            }}
            validationSchema={LoginSchema(hasSchools)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <LoginForm {...formik} isPending={isInitializing || isLoggingIn} schools={schools} />
            )}
          </Formik>
        </Box>

        {/* Divider */}
        {!isMobile && <Divider orientation='vertical' flexItem />}

        {/* Optional Right Box */}
        <Box width='100%' display='flex' justifyContent='center'>
          <NeedHelp />
        </Box>
      </Stack>
    </AuthLayout>
  );
};

export default Login;
