import { Box, Button, Typography, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { FormikProvider, Form, FormikValues, FormikContextType } from 'formik';
import { Person } from '@mui/icons-material';
import { FormField, FormSelect, RadioGroup } from '../../components';
import { getTomorrow } from '../../util';

interface ICreateStudentFormProps<T extends FormikValues> {
  formik: FormikContextType<T>;
  preview: string | null;
  setPreview: (url: string) => void;
  withPassword?: boolean;
}

export default function CreateStudentForm<T extends FormikValues>({
  formik,
  preview,
  setPreview,
  withPassword = true,
}: ICreateStudentFormProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fields = [
    {
      name: 'gender',
      label: 'Gender',
      type: 'radio',
      fullWidth: true,
      options: [
        { value: 'm', label: 'Male' },
        { value: 'f', label: 'Female' },
      ],
    },
    { name: 'firstName', label: 'First Name' },
    { name: 'middleName', label: 'Middle Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'phone', label: 'Phone Number' },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      objects: {
        inputProps: {
          max: getTomorrow(),
        },
      },
    },
    { name: 'email', label: 'Email' },
    ...(withPassword ? [{ name: 'password', label: 'Password', type: 'password' }] : []),
    {
      name: 'address',
      label: 'Address',
      fullWidth: true,
      objects: { multiline: true, minRows: 2 },
    },
  ];

  return (
    <FormikProvider value={formik}>
      <Form
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',

          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        {/* Image Upload Section */}
        <Box
          display='flex'
          flexDirection='column'
          minWidth={isMobile ? '100%' : 150}
          sx={{
            gap: 2,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar src={preview || undefined} sx={{ width: 64, height: 64 }}>
            {!preview && <Person />}
          </Avatar>

          <Box
            display='flex'
            sx={{
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant='outlined'
              component='label'
              sx={{
                background: '#3e6614',
                fontSize: '12px',
                textTransform: 'capitalize',
                color: 'white',
              }}
            >
              Upload Photo
              <input
                type='file'
                accept='image/*'
                hidden
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </Button>
            <Typography sx={{ fontSize: '9px' }}>At least 132 x 132px PNG or JPEG file.</Typography>
          </Box>
        </Box>

        {/* Form Fields */}
        <Box display='flex' flexWrap='wrap' gap={2} justifyContent='flex-start'>
          {fields.map((field) => {
            const value = String(formik.values[field.name]);
            const commonProps = {
              key: field.name,
              flexBasis: field.fullWidth ? '100%' : '48%',
              flexGrow: 1,
            };

            if (field.type === 'radio') {
              return (
                <Box {...commonProps}>
                  <RadioGroup
                    name={field.name}
                    label={field.label}
                    value={value}
                    options={field.options || []}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                  />
                </Box>
              );
            }

            if (field.type === 'select') {
              return (
                <Box {...commonProps}>
                  <FormSelect
                    name={field.name}
                    label={field.label}
                    value={value}
                    options={field.options || []}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Box>
              );
            }

            return (
              <Box {...commonProps}>
                <FormField
                  name={field.name}
                  label={field.label}
                  type={field.type || 'text'}
                  value={value}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  slotProps={{ inputLabel: { shrink: true } }}
                  {...field.objects}
                />
              </Box>
            );
          })}
        </Box>
      </Form>
    </FormikProvider>
  );
}
