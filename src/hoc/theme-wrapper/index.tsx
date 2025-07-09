import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#68aa22',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: '"PT Sans", sans-serif',
    body2: {
      fontSize: '12px',
    },
  },
});
export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
