import { useState } from 'react';
import { CustomStepper, Modal } from '../../../../components';
import {
  Typography,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Button,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';

import { useUpdateUserById, useFetchUserById } from '../../../../hooks';

import { useSnackbar } from '../../../../hoc/snack-bar';
import { UpdateStaffSchema, getStaffInitialValues } from '../../../../schema';
import { CreateStaffForm, UserFormPreview } from '../../../../container';
import { RoundedIcon } from '../../../../assets';

const UpdateStaff = ({
  open,
  onClose,
  userId,
}: {
  userId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: user, isLoading } = useFetchUserById(userId);

  const { mutate: updateUser, isPending } = useUpdateUserById();
  const { showSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: getStaffInitialValues(user, userId),
    validationSchema: UpdateStaffSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (activeStep === 0) {
        setActiveStep((prev) => prev + 1);
        return;
      }
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) => value !== '' && value !== null && value !== undefined,
        ),
      );
      updateUser(filteredValues as any, {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || 'Updated successfully', 'success');
          handleClose();
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || 'Unable to update, please try again',
            'error',
          );
        },
        onSettled: () => actions.setSubmitting(false),
      });
    },
  });
  const handleClose = () => {
    formik.resetForm();
    setPreview(null);
    setActiveStep(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title=''
      isLoading={isLoading}
      onSubmit={formik.handleSubmit}
      hideActions
      dividers={false}
      maxWidth={'md'}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'rgb(245, 245, 247)',
          },
        },
      }}
    >
      <Stack
        spacing={5}
        direction={isMobile ? 'column' : 'row'}
        width='100%'
        justifyContent='center'
        alignItems='stretch'
      >
        {/* Step  Section */}
        <Box width={isMobile ? '100%' : '40%'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1,
              bgcolor: 'white',
              borderRadius: 10,
              color: 'rgb(216, 216, 227)',
              height: 50,
              width: 'fit-content',
              paddingRight: 2,
            }}
            mb={5}
          >
            <RoundedIcon width='60px' height='60px' style={{ marginLeft: '-5px' }} />
            <Typography variant='body2' color={'#68aa22'} fontWeight={900} fontSize={'1rem'}>
              Edit Staff
            </Typography>
          </Box>

          <CustomStepper activeStep={activeStep} steps={['Bio Data', 'Review ']} />
        </Box>

        {/* Form  Section */}
        <Box width='100%'>
          {activeStep === 0 && (
            <CreateStaffForm
              formik={formik}
              preview={preview}
              setPreview={setPreview}
              withPassword={false}
            />
          )}
          {activeStep > 0 && <UserFormPreview values={formik.values} preview={preview} />}
        </Box>
      </Stack>
      <Box
        mt={3}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        {activeStep > 0 && (
          <Button
            type='submit'
            onClick={() => setActiveStep(0)}
            variant='text'
            sx={{
              color: 'rgb(119, 119, 119)',
              minWidth: 150,
              textTransform: 'capitalize',
            }}
          >
            Previous
          </Button>
        )}

        <Button
          type='submit'
          onClick={() => formik.handleSubmit()}
          variant='contained'
          sx={{ background: '#3e6614', minWidth: 150, textTransform: 'capitalize' }}
          disabled={isPending}
          endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
        >
          {activeStep === 0 ? 'Next' : 'Update'}
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateStaff;
