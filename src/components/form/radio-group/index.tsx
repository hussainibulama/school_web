import React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  useTheme,
  Typography,
} from '@mui/material';

interface RadioOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  value: string;
  options: RadioOption[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  row?: boolean;
}

function RadioGroup({
  name,
  label,
  value,
  options,
  handleChange,
  handleBlur,
  error,
  row = true,
}: Props) {
  const theme = useTheme();

  let isInsideFormik = false;

  try {
    const formik = useFormikContext();
    if (formik) isInsideFormik = true;
  } catch {
    isInsideFormik = false;
  }

  return (
    <FormControl
      component='fieldset'
      error={error}
      sx={{ fontFamily: theme.typography.fontFamily }}
    >
      {label && (
        <FormLabel
          component='legend'
          sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 600 }}
        >
          {label}
        </FormLabel>
      )}

      <MuiRadioGroup
        row={row}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size='small' />}
            label={option.label}
            sx={{ fontFamily: theme.typography.fontFamily, fontSize: '10px' }}
            slotProps={{
              typography: {
                sx: {
                  fontSize: '14px',
                  fontFamily: theme.typography.fontFamily,
                  color: 'rgb(56, 58, 63)',
                  ...(error && {
                    color: theme.palette.error.main,
                  }),
                },
              },
            }}
          />
        ))}
      </MuiRadioGroup>

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
    </FormControl>
  );
}

export default RadioGroup;
