import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { SketchPicker } from 'react-color';
import React, { useEffect, useState } from 'react';
import { BreadcrumbHeader } from '../../container';
import { FormField } from '../../components';
import { useGetSchoolInfo, useUpdateSchoolInfo } from '../../hooks';
import { useSnackbar } from '../../hoc';

const colorOptions = ['#2196f3', '#4caf50', '#ff9800', '#e91e63', '#9c27b0'];

export default function UpdateSchoolProfile() {
  const { data: school, isLoading } = useGetSchoolInfo();
  const { mutate: updateSchool, isPending } = useUpdateSchoolInfo();
  const { showSnackbar } = useSnackbar();

  const [customColor, setCustomColor] = useState(school?.data?.schoolColor || '');
  const [logoPreview, setLogoPreview] = useState(school?.data?.schoolLogo || '');

  const initialValues = {
    schoolName: school?.data?.schoolName || '',
    schoolAddress: school?.data?.schoolAddress || '',
    schoolLogo: school?.data?.schoolLogo || '',
    schoolShortName: school?.data?.schoolShortName || '',
    schoolColor: school?.data?.schoolColor || '',
  };

  const validationSchema = Yup.object({
    schoolName: Yup.string().min(2).max(100),
    schoolAddress: Yup.string().nullable(),
    schoolLogo: Yup.string().url().nullable(),
    schoolShortName: Yup.string()
      .nullable()
      .matches(/^[a-z]+$/, 'School short name must be lowercase letters only, no spaces'),
    schoolColor: Yup.string().nullable(),
  });
  useEffect(() => {
    if (school?.data) {
      setCustomColor(school.data.schoolColor || '');
      setLogoPreview(school.data.schoolLogo || '');
    }
  }, [school?.data]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
      setFieldValue('schoolLogo', reader.result); // use this if backend accepts base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    updateSchool(values, {
      onSuccess: () => {
        showSnackbar('School Info updated', 'success');
      },
      onError: (err) => {
        showSnackbar(err?.response?.data?.message || 'Unable to update at the moment', 'error');
      },
    });
  };

  return (
    <Box>
      <BreadcrumbHeader title='Update School Profile' />

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Formik
          enableReinitialize
          initialValues={{ ...initialValues, schoolColor: customColor }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Stack spacing={3} maxWidth={400} mt={4}>
                {/* Logo Upload */}
                <Box display='flex' alignItems='center' flexDirection='column' mb={2}>
                  <Avatar src={logoPreview} sx={{ width: 100, height: 100, mb: 1 }} />
                  <label htmlFor='logo-upload'>
                    <input
                      accept='image/*'
                      id='logo-upload'
                      type='file'
                      hidden
                      onChange={(e) => handleImageUpload(e, formik.setFieldValue)}
                    />
                    <IconButton color='primary' component='span' sx={{ border: '1px solid #ccc' }}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Typography variant='body2' color='text.secondary' mt={1}>
                    Upload school logo
                  </Typography>
                </Box>

                {/* Form Fields */}
                <FormField
                  name='schoolName'
                  label='School Name'
                  value={formik.values.schoolName}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
                <FormField
                  name='schoolAddress'
                  label='School Address'
                  value={formik.values.schoolAddress}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  multiline
                  minRows={2}
                />
                <FormField
                  name='schoolShortName'
                  label='Short Name'
                  value={formik.values.schoolShortName}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />

                {/* Color Picker */}
                <Box>
                  <Typography variant='body2' color='text.secondary' fontSize={'0.65rem'} mb={1}>
                    School Color
                  </Typography>
                  <Grid container spacing={1} mb={2}>
                    {colorOptions.map((color) => (
                      <Grid key={color}>
                        <Box
                          onClick={() => {
                            formik.setFieldValue('schoolColor', color);
                            setCustomColor(color);
                          }}
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: color,
                            border:
                              formik.values.schoolColor === color
                                ? '2px solid black'
                                : '1px solid #ccc',
                            cursor: 'pointer',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Custom Color Picker */}
                  <SketchPicker
                    color={customColor}
                    onChangeComplete={(color) => {
                      setCustomColor(color.hex);
                      formik.setFieldValue('schoolColor', color.hex);
                    }}
                  />
                </Box>

                <Button
                  type='submit'
                  variant='contained'
                  disabled={isPending}
                  sx={{ textTransform: 'capitalize' }}
                  endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
                >
                  Update School Info
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
}
