import { Form } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormField, RadioGroup } from '../../components';

interface ILoginFormProps {
  isPending: boolean;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  handleSubmit: (e: any) => void;
  touched: any;
  errors: any;
  values: any;
}

export default function SignForm({
  isPending,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}: ILoginFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          Get Started!
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
          1️⃣ Let’s get to know a bit about you.
        </Typography>
        <Stack direction='row' spacing={2} sx={{ flexWrap: 'nowrap' }}>
          <Box sx={{ flexGrow: 1 }}>
            <FormField
              name='firstName'
              label='First Name'
              value={values.firstName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              fullWidth
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <FormField
              name='middleName'
              label='Middle Name'
              value={values.middleName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.middleName && Boolean(errors.middleName)}
              fullWidth
            />
          </Box>
        </Stack>
        <FormField
          name='lastName'
          label='Last Name'
          value={values.lastName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          fullWidth
        />
        <RadioGroup
          name='gender'
          value={values.gender}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.gender && Boolean(errors.gender)}
          options={[
            { label: 'Male', value: 'm' },
            { label: 'Female', value: 'f' },
          ]}
        />
        <Typography
          variant='body2'
          align={isMobile ? 'center' : 'left'}
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            color: 'rgb(56, 58, 63)',
          }}
        >
          2️⃣ Now tell us a bit about the School you work and represent.
        </Typography>
        <FormField
          name='schoolName'
          label='School Name'
          value={values.schoolName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.schoolName && Boolean(errors.schoolName)}
        />

        <FormField
          name='schoolAddress'
          label='School Address'
          multiline
          minRows={2}
          value={values.schoolAddress}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.schoolAddress && Boolean(errors.schoolAddress)}
        />
        <Typography
          variant='body2'
          align={isMobile ? 'center' : 'left'}
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: '14px',
            color: 'rgb(56, 58, 63)',
          }}
        >
          3️⃣ Finally, let’s create your login credentials.
        </Typography>
        <FormField
          name='email'
          label='Email Address'
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
        />
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
            fontSize: '16px',
            fontFamily: theme.typography.fontFamily,
          }}
          endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
        >
          Get Started
        </Button>
      </Stack>
    </Form>
  );
}
