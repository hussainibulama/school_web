import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from './hoc/snack-bar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
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
});
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
            }}
          >
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
