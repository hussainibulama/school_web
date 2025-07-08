import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  DialogProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

interface ModalProps extends Partial<DialogProps> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  isSubmitting?: boolean;
  hideActions?: boolean;
  error?: boolean;
}

const Modal = ({
  open,
  onClose,
  title = 'Modal Title',
  children,
  onSubmit,
  submitText = 'Submit',
  isSubmitting = false,
  hideActions = false,
  error,
  ...dialogProps // ⬅️ capture extra DialogProps
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='xs'
      {...dialogProps}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '8px',
          margin: 'auto',

          '@media (max-width: 600px)': {
            width: '90%',
            height: 'auto',
            margin: '16px auto',
          },
        },
      }}
    >
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      {!hideActions && (
        <DialogActions>
          <Box display='flex' width='100%' gap={1}>
            <Button
              onClick={onClose}
              color='primary'
              disabled={isSubmitting}
              fullWidth
              sx={{
                flex: 1,
                background: 'white',
                fontFamily: `"Inter", sans-serif`,
                fontSize: '0.8rem',
                textTransform: 'capitalize',
                height: '32px',
                color: 'black',
                border: '1px solid #ccc',
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Light gray on hover
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0', // Disabled background color
                  color: '#a0a0a0', // Disabled text color
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              color='primary'
              disabled={isSubmitting}
              fullWidth
              sx={{
                flex: 1,
                background: error ? '#e57373' : '#4d8cec',
                fontFamily: `"Inter", sans-serif`,
                fontSize: '0.8rem',
                textTransform: 'capitalize',
                height: '32px',
                color: 'white',
                '&:hover': {
                  backgroundColor: error ? "#d32f2f'" : '#357ab7',
                },
                '&:disabled': {
                  backgroundColor: '#8aacc8',
                },
              }}
              endIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : null}
            >
              {isSubmitting ? 'Submitting...' : submitText}
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
