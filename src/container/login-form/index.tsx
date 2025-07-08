import { Form } from 'formik';
import { Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormField, FormSelect } from '../../components';

interface ILoginFormProps {
  isPending: boolean;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  handleSubmit: (e: any) => void;
  touched: any;
  errors: any;
  values: any;
  schools: any[];
}

export default function LoginForm({
  isPending,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  schools,
}: ILoginFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const options = schools?.map((entry) => ({ label: entry?.schoolName, value: entry?.schoolId }));
  return (
    <Form>
      <Stack spacing={2}>
        <Typography
          variant='h4'
          align={isMobile ? 'center' : 'left'}
          fontWeight='bold'
          sx={{
            fontFamily: theme.typography.fontFamily,
            color: 'rgb(56, 58, 63)',
            fontSize: '36px',
            fontWeight: 'bold',
          }}
        >
          Log in
        </Typography>
        <Typography
          variant='body2'
          align={isMobile ? 'center' : 'left'}
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            color: 'rgb(56, 58, 63)',
          }}
        >
          Enter your login details below!
        </Typography>
        <FormField
          name='email'
          label='Email Address'
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
        />
        {schools?.length > 0 && (
          <FormSelect
            name='schoolId'
            label='Schools'
            options={options}
            value={values.schoolId}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.schoolId && Boolean(errors.schoolId)}
          />
        )}
        <FormField
          name='password'
          label='Password'
          type='password'
          value={values.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={isPending}
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            color: '#fff',
            fontSize: '16px',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Log in
        </Button>
      </Stack>
    </Form>
  );
}
