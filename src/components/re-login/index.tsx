import { Typography } from '@mui/material';
import { FormField, Modal } from '../';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '../../hooks';
import { useSnackbar } from '../../hoc';
import { AUTH_STORAGE_KEY } from '../../contants';

interface IReloginProps {
  open: boolean;
  onClose: () => void;
  email: string;
  schoolId: string;
}

const ReloginSchema = Yup.object().shape({
  password: Yup.string().min(6).required('Password is required'),
});

export default function ReLogin({ open, onClose, email, schoolId }: IReloginProps) {
  const { mutate: loginUser, isPending } = useLogin();

  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { email, password: '', schoolId },
    validationSchema: ReloginSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      loginUser(values, {
        onSuccess: (res: any) => {
          localStorage.setItem(AUTH_STORAGE_KEY, res?.data?.token);
          showSnackbar('User re-logged in successfully', 'success');
          onClose();
        },
        onError: (err) => {
          showSnackbar(err?.response?.data?.message || 'Unable to re-login', 'error');
        },
        onSettled: () => actions.setSubmitting(false),
      });
    },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        // can't login – no action or redirect
      }}
      onSubmit={formik.handleSubmit}
      isSubmitting={isPending}
      submitText='Re-Login'
      title='Session Expired'
      error={false}
      maxWidth='xs'
    >
      <FormikProvider value={formik}>
        <Typography variant='body2' color='textSecondary' mb={2}>
          Your session has expired, possibly due to inactivity or token expiration. Please enter
          your password to continue where you left off.
        </Typography>

        {/* Display email as plain text */}
        <Typography variant='subtitle2' fontWeight='bold' mt={1} mb={1}>
          {email}
        </Typography>

        <FormField
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
      </FormikProvider>
    </Modal>
  );
}
