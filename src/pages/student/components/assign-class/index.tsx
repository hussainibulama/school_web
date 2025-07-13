import { FormSelect, Modal } from '../../../../components';
import { FormikProvider, useFormik } from 'formik';
import { useAssignClass, useGetSchoolClass } from '../../../../hooks';
import { useSnackbar } from '../../../../hoc/snack-bar';
import * as Yup from 'yup';
import { Box } from '@mui/material';

const AssignClassSchema = Yup.object().shape({
  schoolClassId: Yup.string().required('Class is required'),
});
const AssignClass = ({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId?: string;
}) => {
  const { data: classList, isLoading } = useGetSchoolClass();

  const { mutate: assignClass, isPending } = useAssignClass();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { schoolClassId: '', userId },
    validationSchema: AssignClassSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      assignClass(
        { schoolClassId: values.schoolClassId, studentIds: [values?.userId || ''] },
        {
          onSuccess: (res: any) => {
            showSnackbar(res?.message || 'Student assigned successfully', 'success');
            handleClose();
          },
          onError: (err: any) => {
            showSnackbar(err?.response?.data?.message || 'Unable to assign student', 'error');
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
    classList?.data.map((entry: any) => ({
      value: entry.schoolClassId,
      label: entry.label,
    })) || [];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isSubmitting={isPending}
      title='Assign Class'
      onSubmit={formik.handleSubmit}
      submitText='Save'
      dividers={false}
      isLoading={isLoading}
    >
      <FormikProvider value={formik}>
        <Box py={2}>
          <FormSelect
            name='schoolClassId'
            label='Select Class'
            options={rows}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </Box>
      </FormikProvider>
    </Modal>
  );
};

export default AssignClass;
