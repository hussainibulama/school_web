import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { BreadcrumbHeader } from '../../container';
import { FormField } from '../../components';
import { useChangePassword } from '../../hooks';
import { useSnackbar } from '../../hoc';

export default function ChangePassword() {
  const { mutate: changePassword, isPending } = useChangePassword();
  const { showSnackbar } = useSnackbar();

  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Current password is required'),
    password: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm your new password')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    changePassword(values, {
      onSuccess: () => {
        showSnackbar('Password Changed Successfully', 'success');
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.message || 'Unable to change password at the moment',
          'error',
        );
      },
    });
  };

  return (
    <Box>
      <BreadcrumbHeader title='Change Password' />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Stack spacing={3} maxWidth={400} mt={4}>
              <FormField
                name='oldPassword'
                label='Current Password'
                type='password'
                value={formik.values.oldPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
              <FormField
                name='password'
                label='New Password'
                type='password'
                value={formik.values.password}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
              <FormField
                name='confirmPassword'
                label='Confirm New Password'
                type='password'
                value={formik.values.confirmPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
              <Button
                type='submit'
                variant='contained'
                disabled={isPending}
                sx={{
                  textTransform: 'capitalize',
                }}
                endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
              >
                Change Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
