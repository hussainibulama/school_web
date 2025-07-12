import { useSnackbar } from '../../../../hoc';
import { useDeleteArms } from '../../../../hooks';
import { ConfirmationModal } from '../../../../components';

interface IDeleteArmProps {
  classArmId: string;
  open?: boolean;
  closeModal: () => void;
}
export default function DeleteArm({ classArmId, open = false, closeModal }: IDeleteArmProps) {
  const { showSnackbar } = useSnackbar();

  const { mutate: deleteArm, isPending: isSubmitting } = useDeleteArms();

  const deactivateUser = () => {
    deleteArm(
      { classArmId },
      {
        onSuccess: () => {
          closeModal();
          showSnackbar('Deleted successfully', 'success');
        },
        onError: () => {
          showSnackbar('Unable to Delete, try later', 'error');
        },
      },
    );
  };

  return (
    <ConfirmationModal
      open={open}
      onClose={closeModal}
      onConfirm={deactivateUser}
      isSubmitting={isSubmitting}
      error={true}
      title={`Delete Arm`}
      message={`Are you sure you want to delete this arm`}
      confirmText={'Delete'}
    />
  );
}
