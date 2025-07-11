import { Modal } from '../'; // Adjust the path to where your Modal is located
import { Typography } from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  isLoading?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  error?: boolean;
}

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  isSubmitting,
  isLoading,
  title = '',
  message = '',
  confirmText = '',
  error,
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      onSubmit={onConfirm}
      isSubmitting={isSubmitting}
      submitText={confirmText}
      isLoading={isLoading}
      title={title}
      error={error}
    >
      <Typography variant='body2'>{message}</Typography>
    </Modal>
  );
};

export default ConfirmationModal;
