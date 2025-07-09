import { Stack, Typography, useTheme, Link } from '@mui/material';
import { APP_NAME } from '../../contants';

const linkStyle = {
  color: '#33aabf',
  textDecoration: 'underline',
  '&:hover': {
    color: '#62cfe3',
  },
};
export default function NeedHelp() {
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
        Need help?
      </Typography>
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          color: '#595350',
        }}
      >
        For help with {APP_NAME} Parent Portal or {APP_NAME} Management Information System (MIS) for
        schools, take a look at our Help Centre.
      </Typography>
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '14px',
          color: '#595350',
          pt: 3,
        }}
      >
        Don't have an account? no worries{' '}
        <Link href='/signup' underline='always' sx={linkStyle}>
          Create account
        </Link>
      </Typography>
    </Stack>
  );
}
