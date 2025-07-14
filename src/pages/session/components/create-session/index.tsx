import { FormField, FormSelect, RadioGroup, Modal } from '../../../../components';
import { FormikProvider, useFormik, Form } from 'formik';
import { useAddSchoolSession, useGetAcademicYears } from '../../../../hooks';
import { useSnackbar } from '../../../../hoc/snack-bar';
import * as Yup from 'yup';
import { Box } from '@mui/material';

const UpdateSessionSchema = Yup.object().shape({
  academicYear: Yup.string().required('Academic Year is required'),
  firstTermStart: Yup.date().required('First Term Start is required'),
  firstTermEnd: Yup.date().required('First Term End is required'),
  secondTermStart: Yup.date().required('Second Term Start is required'),
  secondTermEnd: Yup.date().required('Second Term End is required'),
  thirdTermStart: Yup.date().required('Third Term Start is required'),
  thirdTermEnd: Yup.date().required('Third Term End is required'),
  currentTerm: Yup.number().required('Current Term is required'),
  isCurrent: Yup.boolean().required('Is Current is required'),
});

const CreateSession = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { data: academicYears, isLoading } = useGetAcademicYears();
  const { mutate: addSession, isPending } = useAddSchoolSession();
  const { showSnackbar } = useSnackbar();

  const academicYearOptions =
    academicYears?.data.map((entry: any) => ({
      value: entry.yearLabel,
      label: entry.yearLabel,
    })) || [];

  const formik = useFormik({
    initialValues: {
      academicYear: '',
      firstTermStart: '',
      firstTermEnd: '',
      secondTermStart: '',
      secondTermEnd: '',
      thirdTermStart: '',
      thirdTermEnd: '',
      currentTerm: 1,
      isCurrent: false,
    },
    validationSchema: UpdateSessionSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      addSession(values as any, {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || 'Session Created successfully', 'success');
          handleClose();
        },
        onError: (err: any) => {
          showSnackbar(err?.response?.data?.message || 'Unable to Create session', 'error');
        },
        onSettled: () => actions.setSubmitting(false),
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const value = (name: keyof typeof formik.values) => String(formik.values[name]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isSubmitting={isPending}
      title='Create Session'
      onSubmit={formik.handleSubmit}
      submitText='Save'
      dividers={false}
      isLoading={isLoading}
    >
      <FormikProvider value={formik}>
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Academic Year */}
          <Box flexBasis='100%' mt={2}>
            <FormSelect
              name='academicYear'
              label='Select Session'
              value={value('academicYear')}
              options={academicYearOptions}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ '& .MuiSelect-select': { fontSize: '0.875rem' } }}
            />
          </Box>

          {/* First Term */}
          <Box display='flex' flexWrap='wrap' gap={2}>
            <Box sx={{ flex: '1 1 40%', minWidth: 100 }}>
              <FormField
                name='firstTermStart'
                label='First Term Start'
                type='date'
                value={value('firstTermStart')}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& input': { fontSize: '0.875rem' } }}
              />
            </Box>
            <Box sx={{ flex: '1 1 40%', minWidth: 100 }}>
              <FormField
                name='firstTermEnd'
                label='First Term End'
                type='date'
                value={value('firstTermEnd')}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& input': { fontSize: '0.875rem' } }}
              />
            </Box>
          </Box>

          {/* Second Term */}
          <Box display='flex' flexWrap='wrap' gap={2}>
            <Box sx={{ flex: '1 1 40%', minWidth: 100 }}>
              <FormField
                name='secondTermStart'
                label='Second Term Start'
                type='date'
                value={value('secondTermStart')}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& input': { fontSize: '0.875rem' } }}
              />
            </Box>
            <Box sx={{ flex: '1 1 40%', minWidth: 100 }}>
              <FormField
                name='secondTermEnd'
                label='Second Term End'
                type='date'
                value={value('secondTermEnd')}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& input': { fontSize: '0.875rem' } }}
              />
            </Box>
          </Box>

          {/* Third Term */}
          <Box display='flex' flexWrap='wrap' gap={2}>
            <Box sx={{ flex: '1 1 40%', minWidth: 100 }}>
              <FormField
                name='thirdTermStart'
                label='Third Term Start'
                type='date'
                value={value('thirdTermStart')}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& input': { fontSize: '0.875rem' } }}
              />
            </Box>
            <Box sx={{ flex: '1 1 40%', minWidth: 100 }}>
              <FormField
                name='thirdTermEnd'
                label='Third Term End'
                type='date'
                value={value('thirdTermEnd')}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& input': { fontSize: '0.875rem' } }}
              />
            </Box>
          </Box>

          {/* Current Term + IsCurrent */}
          <Box display='flex' flexWrap='wrap' gap={2}>
            <Box flexBasis='100%'>
              <FormSelect
                name='currentTerm'
                label='Current Term'
                value={value('currentTerm')}
                options={[
                  { value: 1, label: 'First Term' },
                  { value: 2, label: 'Second Term' },
                  { value: 3, label: 'Third Term' },
                ]}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ '& .MuiSelect-select': { fontSize: '0.875rem' } }}
              />
            </Box>
            <Box flexBasis='100%'>
              <RadioGroup
                name='isCurrent'
                label='Is Current Session?'
                value={formik.values.isCurrent}
                options={[
                  { value: true, label: 'Yes' },
                  { value: false, label: 'No' },
                ]}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default CreateSession;
