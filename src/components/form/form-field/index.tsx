import React from 'react';
import { Box, TextField, Typography, TextFieldProps } from '@mui/material';
import { ErrorMessage } from 'formik';

interface FormFieldProps
  extends Omit<TextFieldProps, 'name' | 'label' | 'value' | 'onChange' | 'onBlur'> {
  name: string;
  label: string;
  type?: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const FormField = ({
  name,
  label,
  type = 'text',
  value,
  handleChange,
  handleBlur,
  ...rest
}: FormFieldProps) => (
  <Box>
    <TextField
      fullWidth
      size='small'
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      sx={{ backgroundColor: 'white', fontFamily: `"Inter", sans-serif` }}
      slotProps={{
        inputLabel: {
          sx: { fontSize: '0.8rem' },
        },
        input: {
          sx: { fontSize: '0.8rem' },
        },
      }}
      {...rest} // <-- Add all additional TextField props here
    />
    <ErrorMessage
      name={name}
      render={(msg) => (
        <Typography variant='caption' color='error'>
          {msg}
        </Typography>
      )}
    />
  </Box>
);

export default FormField;
