import React from 'react';
import { Box, TextField, Typography, MenuItem, TextFieldProps, useTheme } from '@mui/material';
import { ErrorMessage } from 'formik';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps
  extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'label'> {
  name: string;
  label?: string;
  value?: string;
  options?: Option[];
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const FormSelect = ({
  name,
  label,
  value,
  options,
  handleChange,
  handleBlur,
  ...rest
}: FormSelectProps) => {
  const theme = useTheme();

  return (
    <Box>
      <TextField
        select
        fullWidth
        size='small'
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
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
      >
        {options?.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{ fontFamily: theme.typography.fontFamily, fontSize: '0.8rem' }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
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
};

export default FormSelect;
