import { FormSelect, Modal } from '../../../../components';
import { FormikProvider, useFormik } from 'formik';
import { useAssignParent, useStudentList } from '../../../../hooks';
import { useSnackbar } from '../../../../hoc/snack-bar';
import * as Yup from 'yup';
import { Box } from '@mui/material';

const AssignStudentsSchema = Yup.object().shape({
  studentId: Yup.string().required('Student is required'),
});
const AssignStudents = ({
  open,
  onClose,
  parentId,
}: {
  open: boolean;
  onClose: () => void;
  parentId?: string;
}) => {
  const { data: studentList, isLoading } = useStudentList();

  const { mutate: assignParent, isPending } = useAssignParent();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { parentId: parentId || '', studentId: '' },
    validationSchema: AssignStudentsSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      assignParent(values, {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || 'Student assigned successfully', 'success');
          handleClose();
        },
        onError: (err: any) => {
          showSnackbar(err?.response?.data?.message || 'Unable to assign student', 'error');
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
    studentList?.data.map((entry: any) => ({
      value: entry.userId,
      label: `${entry.firstName} ${entry?.middleName || ''} ${entry.lastName}`,
    })) || [];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isSubmitting={isPending}
      title='Search and Link Student'
      onSubmit={formik.handleSubmit}
      submitText='Save'
      dividers={false}
      isLoading={isLoading}
    >
      <FormikProvider value={formik}>
        <Box py={2}>
          <FormSelect
            name='studentId'
            label='Select Student'
            options={rows}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </Box>
      </FormikProvider>
    </Modal>
  );
};

export default AssignStudents;
