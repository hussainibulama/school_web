import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeWrapper, GeneralProvider, SnackbarProvider } from './hoc';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <GeneralProvider>
      <ThemeWrapper>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter
              future={{
                v7_relativeSplatPath: true,
              }}
            >
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeWrapper>
    </GeneralProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
