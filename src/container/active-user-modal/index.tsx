import { Fragment } from 'react';
import { ConfirmationModal } from '../../components';
import { useFetchUserById, useUpdateUserById } from '../../hooks';
import { useSnackbar } from '../../hoc';

interface IActivateUserModalProps {
  userId?: string;
  open?: boolean;
  closeModal: () => void;
}
export default function ActivateUserModal({
  userId,
  open = false,
  closeModal,
}: IActivateUserModalProps) {
  const { showSnackbar } = useSnackbar();

  const { data: user, isLoading } = useFetchUserById(userId);

  const isActive = user?.data.active || false;

  const { mutate: updateUser, isPending: isSubmitting } = useUpdateUserById();

  const deactivateUser = () => {
    updateUser(
      {
        userId: user?.data?.userId || '',
        active: !user?.data?.active || false,
      },
      {
        onSuccess: () => {
          closeModal();
          showSnackbar('Deactivated successfully', 'success');
        },
        onError: () => {
          showSnackbar('Unable to deactivate, try later', 'error');
        },
      },
    );
  };

  return (
    <Fragment>
      <ConfirmationModal
        open={open}
        onClose={closeModal}
        onConfirm={deactivateUser}
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        error={isActive}
        title={`${isActive ? 'Deactivate' : 'Activate'} User`}
        message={`Are you sure you want to ${isActive ? 'deactivate' : 'activate'} this user?`}
        confirmText={isActive ? 'Deactivate' : 'Activate'}
      />
    </Fragment>
  );
}
