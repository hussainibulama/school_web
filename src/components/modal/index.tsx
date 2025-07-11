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
  useTheme,
  Breakpoint,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../loader';

interface ModalProps extends Partial<DialogProps> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
  hideActions?: boolean;
  error?: boolean;
  maxWidth?: Breakpoint | false;
  dividers?: boolean;
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
  dividers = true,
  isLoading,
  error,
  maxWidth = 'xs',

  ...dialogProps // ⬅️ capture extra DialogProps
}: ModalProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
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
      {...dialogProps}
    >
      {isLoading && <Loader />}
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers={dividers}>{children}</DialogContent>

      {!hideActions && (
        <DialogActions>
          <Box display='flex' width='100%' gap={1}>
            <Button
              onClick={onClose}
              variant='text'
              disabled={isSubmitting}
              fullWidth
              sx={{
                flex: 1,
                background: 'white',
                fontFamily: theme.typography.fontFamily,
                textTransform: 'capitalize',
                color: 'black',
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                  color: '#a0a0a0',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              variant='contained'
              disabled={isSubmitting}
              fullWidth
              sx={{
                flex: 1,
                background: error ? '#e57373' : 'auto',
                fontFamily: theme.typography.fontFamily,
                textTransform: 'capitalize',
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
