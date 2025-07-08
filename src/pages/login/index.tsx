import { useState } from 'react';
import { Box, Divider, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import { LogoVireo, TermsAndCondition, LoginForm } from '../../container';
import { useInitUser, useLogin } from './hook';
import { useSnackbar } from '../../hoc/snack-bar';
import { AUTH_STORAGE_KEY } from '../../contants';
import loginSchema from './loginSchema';

interface LoginValues {
  email: string;
  password: string;
  schoolId: string;
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
    if (hasSchools) {
      // Login flow
      loginUser(values, {
        onSuccess: (res) => {
          localStorage.setItem(AUTH_STORAGE_KEY, res?.data?.token);
          showSnackbar(res?.message || 'Success', 'success');
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
          showSnackbar(res?.message || 'Success', 'success');
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

  return (
    <Box
      minHeight='100dvh'
      width='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor={theme.palette.background.default}
    >
      <Stack
        spacing={10}
        width='100%'
        maxWidth={900}
        flexDirection='column'
        alignItems={isMobile ? 'center' : 'flex-start'}
        px={3}
      >
        {/* Logo */}
        <LogoVireo />

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
              initialValues={{ email: '', password: '', schoolId: '' }}
              validationSchema={loginSchema(hasSchools)}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <LoginForm
                  {...formik}
                  isPending={isInitializing || isLoggingIn}
                  schools={schools}
                />
              )}
            </Formik>
          </Box>

          {/* Divider */}
          {!isMobile && <Divider orientation='vertical' flexItem />}

          {/* Optional Right Box */}
          <Box width='100%' display='flex' alignItems='center' justifyContent='center'>
            <Typography variant='body1'>Right Box Content</Typography>
          </Box>
        </Stack>

        {/* Footer */}
        <TermsAndCondition />
      </Stack>
    </Box>
  );
};

export default Login;
