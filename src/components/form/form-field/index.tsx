import React from 'react';
import { Box, TextField, Typography, TextFieldProps, useTheme } from '@mui/material';
import { ErrorMessage, useFormikContext } from 'formik';

interface FormFieldProps
  extends Omit<TextFieldProps, 'name' | 'label' | 'value' | 'onChange' | 'onBlur'> {
  name: string;
  label: string;
  type?: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const FormField = ({
  name,
  label,
  type = 'text',
  value,
  handleChange,
  handleBlur,
  ...rest
}: FormFieldProps) => {
  const theme = useTheme();

  let isInsideFormik = false;

  try {
    // Try getting Formik context
    const formik = useFormikContext();
    if (formik) isInsideFormik = true;
  } catch (e) {
    isInsideFormik = false;
  }

  return (
    <Box>
      <TextField
        fullWidth
        size='small'
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        {...(handleBlur && { onBlur: handleBlur })}
        sx={{ backgroundColor: 'white', fontFamily: theme.typography.fontFamily }}
        slotProps={{
          inputLabel: {
            sx: { fontSize: '0.8rem' },
          },
          input: {
            sx: { fontSize: '0.8rem' },
          },
        }}
        {...rest}
      />
      {isInsideFormik && (
        <ErrorMessage
          name={name}
          render={(msg) => (
            <Typography variant='caption' color='error'>
              {msg}
            </Typography>
          )}
        />
      )}
    </Box>
  );
};

export default FormField;
