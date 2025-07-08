import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';

type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error';

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

const TransitionRight = (props: SlideProps) => <Slide {...props} direction='left' />;

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as SnackbarSeverity,
  });

  const showSnackbar = (message: string, severity: SnackbarSeverity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={TransitionRight}
        sx={{
          right: 0,
          [`@media (min-width:600px)`]: {
            right: 0,
          },
        }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return context;
};
