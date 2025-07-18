import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { LogoVireo, TermsAndCondition } from '../../container';
import { APP_NAME } from '../../contants';
import { useNavigate } from 'react-router';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      minHeight='100dvh'
      width='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor={theme.palette.background.default}
    >
      <Helmet>
        <title>
          {title} | {APP_NAME}
        </title>
      </Helmet>
      <Stack
        spacing={7}
        width='100%'
        maxWidth={900}
        flexDirection='column'
        alignItems={isMobile ? 'center' : 'flex-start'}
        px={2}
        py={4}
      >
        {/* Logo */}
        <LogoVireo onClick={() => navigate('/')} />

        {children}

        {/* Footer */}
        <TermsAndCondition />
      </Stack>
    </Box>
  );
};

export default AuthLayout;
