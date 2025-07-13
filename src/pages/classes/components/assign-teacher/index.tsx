import { FormSelect, Modal } from '../../../../components';
import { FormikProvider, useFormik } from 'formik';
import { useAssignTeacher, useGetStaffList } from '../../../../hooks';
import { useSnackbar } from '../../../../hoc/snack-bar';
import * as Yup from 'yup';
import { Box } from '@mui/material';

const AssignTeacherSchema = Yup.object().shape({
  teacherId: Yup.string().required('Teacher is required'),
});
const AssignTeacher = ({
  open,
  onClose,
  schoolClassId,
}: {
  open: boolean;
  onClose: () => void;
  schoolClassId?: string;
}) => {
  const { data: staffList, isLoading } = useGetStaffList();

  const { mutate: assignTeacher, isPending } = useAssignTeacher();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { teacherId: '', schoolClassId },
    validationSchema: AssignTeacherSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      assignTeacher(values as any, {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || 'Teacher assigned successfully', 'success');
          handleClose();
        },
        onError: (err: any) => {
          showSnackbar(err?.response?.data?.message || 'Unable to assign teacher', 'error');
        },
        onSettled: () => actions.setSubmitting(false),
      });
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  const rows: any[] =
    staffList?.data.map((entry: any) => ({
      value: entry.userId,
      label: `${entry.firstName} ${entry?.middleName || ''} ${entry.lastName}`,
    })) || [];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isSubmitting={isPending}
      title='Assign Form Teacher'
      onSubmit={formik.handleSubmit}
      submitText='Save'
      dividers={false}
      isLoading={isLoading}
    >
      <FormikProvider value={formik}>
        <Box py={2}>
          <FormSelect
            name='teacherId'
            label='Select Teacher'
            options={rows}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </Box>
      </FormikProvider>
    </Modal>
  );
};

export default AssignTeacher;
