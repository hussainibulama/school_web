import { Stack, Typography, useTheme, Link } from '@mui/material';
import { APP_NAME } from '../../contants';

const linkStyle = {
  color: '#33aabf',
  textDecoration: 'underline',
  '&:hover': {
    color: '#62cfe3',
  },
};
export default function SignupMessage() {
  const theme = useTheme();

  return (
    <Stack>
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '22px',
          color: '#3c3735',
        }}
      >
        Getting to know you
      </Typography>
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          color: '#595350',
        }}
      >
        By signing up, you agree to {APP_NAME}'s Terms of Service and Privacy Policy. For help with{' '}
        {APP_NAME}'s Parent Portal or Management Information System (MIS) for schools, visit our
        Help Centre.
      </Typography>
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          color: '#595350',
          pt: 3,
        }}
      >
        Already have an account? no worries{' '}
        <Link href='/login' underline='always' sx={linkStyle}>
          Login
        </Link>
      </Typography>
    </Stack>
  );
}
