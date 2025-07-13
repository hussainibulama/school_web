import { FormSelect, Modal } from '../../../../components';
import { FormikProvider, useFormik } from 'formik';
import { useAssignParent, useParentList } from '../../../../hooks';
import { useSnackbar } from '../../../../hoc/snack-bar';
import * as Yup from 'yup';
import { Box } from '@mui/material';

const AssignParentSchema = Yup.object().shape({
  parentId: Yup.string().required('Parent is required'),
});
const AssignParent = ({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId?: string;
}) => {
  const { data: parentList, isLoading } = useParentList();

  const { mutate: assignParent, isPending } = useAssignParent();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { parentId: '', userId },
    validationSchema: AssignParentSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      assignParent(
        { studentId: values.userId || '', parentId: values.parentId },
        {
          onSuccess: (res: any) => {
            showSnackbar(res?.message || 'Parent assigned successfully', 'success');
            handleClose();
          },
          onError: (err: any) => {
            showSnackbar(err?.response?.data?.message || 'Unable to assign parent', 'error');
          },
          onSettled: () => actions.setSubmitting(false),
        },
      );
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  const rows: any[] =
    parentList?.data.map((entry: any) => ({
      value: entry.userId,
      label: `${entry.firstName} ${entry?.middleName || ''} ${entry.lastName}`,
    })) || [];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isSubmitting={isPending}
      title='Assign Parent/Guardian'
      onSubmit={formik.handleSubmit}
      submitText='Save'
      dividers={false}
      isLoading={isLoading}
    >
      <FormikProvider value={formik}>
        <Box py={2}>
          <FormSelect
            name='parentId'
            label='Select Parent'
            options={rows}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </Box>
      </FormikProvider>
    </Modal>
  );
};

export default AssignParent;
