import { useNavigate } from 'react-router-dom';
import { Box, Divider, Stack, useTheme, useMediaQuery } from '@mui/material';
import { AuthLayout } from '../../components';
import { Formik, FormikHelpers } from 'formik';
import { AUTH_STORAGE_KEY } from '../../contants';
import { SignForm, SignupMessage } from '../../container';
import { useSignup, useLogin } from '../../hooks';
import { useSnackbar } from '../../hoc';
import { SignupSchema } from '../../schema';
import { SignupPayload } from '../../interface';

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { showSnackbar } = useSnackbar();

  const { mutate: signUpUser, isPending: isInitializing } = useSignup();
  const { mutate: loginUser, isPending: isLoggingIn } = useLogin();

  const handleLogin = (
    values: SignupPayload,
    actions: FormikHelpers<SignupPayload>,
    response: any,
  ) => {
    const { email, password } = values || {};
    const { schoolId } = response?.data || {};
    loginUser(
      { email, password, schoolId },
      {
        onSuccess: (res) => {
          localStorage.setItem(AUTH_STORAGE_KEY, res?.data?.token);
          showSnackbar(res?.message || 'Success', 'success');
          actions.resetForm();
          navigate('/dashboard');
        },
        onError: (err) => {
          console.error(err);
          showSnackbar('Error logging you in... you can attempt to login agin', 'error');
          navigate('/login');
        },
        onSettled: () => actions.setSubmitting(false),
      },
    );
  };
  const handleSubmit = (values: SignupPayload, actions: FormikHelpers<SignupPayload>) => {
    showSnackbar('Registering...', 'success');

    signUpUser(values, {
      onSuccess: (res) => {
        showSnackbar('Registered Successfully, logging you in....', 'success');
        // if successfully signup, log user in
        handleLogin(values, actions, res);
      },
      onError: (err) => {
        console.error(err);
        showSnackbar(err?.response?.data?.message || 'Error', 'error');
      },
      onSettled: () => actions.setSubmitting(false),
    });
  };

  return (
    <AuthLayout title='Get started as a school'>
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
              email: '',
              password: '',
              schoolName: '',
              schoolAddress: '',
              firstName: '',
              lastName: '',
              gender: '',
              role: 'proprietor',
            }}
            validationSchema={SignupSchema()}
            onSubmit={handleSubmit}
          >
            {(formik) => <SignForm {...formik} isPending={isInitializing || isLoggingIn} />}
          </Formik>
        </Box>

        {/* Divider */}
        {!isMobile && <Divider orientation='vertical' flexItem />}

        {/* Optional Right Box */}
        <Box width='100%' display='flex' justifyContent='center'>
          <SignupMessage />
        </Box>
      </Stack>
    </AuthLayout>
  );
};

export default Signup;
