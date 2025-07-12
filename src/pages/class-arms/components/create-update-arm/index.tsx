import { FormField, Modal } from '../../../../components';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from '../../../../hoc';
import { useCreateArms, useUpdateArms } from '../../../../hooks';

interface ICreateUpdateArmProps {
  open: boolean;
  onClose: () => void;
  classArmId?: string;
  classArmName?: string;
}

const CreateUpdateSchema = Yup.object().shape({
  classArmName: Yup.string().min(1).required('Password is required'),
});

export default function CreateUpdateArm({
  open,
  onClose,
  classArmId = '',
  classArmName = '',
}: ICreateUpdateArmProps) {
  const isUpdate = classArmId && classArmId.length > 0;
  const { mutate: createArms, isPending } = useCreateArms();
  const { mutate: updateArms, isPending: _isPending } = useUpdateArms();

  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { classArmId, classArmName },
    validationSchema: CreateUpdateSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (isUpdate) {
        updateArms(values, {
          onSuccess: () => {
            showSnackbar('Updated Successfully', 'success');
            onClose();
          },
          onError: (err) => {
            showSnackbar(err?.response?.data?.message || 'Unable to update at the moment', 'error');
          },
          onSettled: () => actions.setSubmitting(false),
        });
        return;
      }
      createArms(
        { arms: [values.classArmName] },
        {
          onSuccess: () => {
            showSnackbar('Arm Created Successfully', 'success');
            onClose();
          },
          onError: (err) => {
            showSnackbar(
              err?.response?.data?.message || 'Unable to create arm at the moment',
              'error',
            );
          },
          onSettled: () => actions.setSubmitting(false),
        },
      );
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      isSubmitting={isPending || _isPending}
      submitText={'Save Arm'}
      title={`${isUpdate ? 'Update' : 'Add'} Arm`}
      error={false}
      maxWidth='xs'
    >
      <FormikProvider value={formik}>
        <FormField
          name='classArmName'
          label='Arm Name'
          value={
            formik.values.classArmName
              ? formik.values.classArmName.charAt(0).toUpperCase() +
                formik.values.classArmName.slice(1)
              : ''
          }
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={formik.touched.classArmName && Boolean(formik.errors.classArmName)}
        />
      </FormikProvider>
    </Modal>
  );
}
