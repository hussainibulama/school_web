import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  ListSubheader,
  InputAdornment,
  TextFieldProps,
  useTheme,
} from '@mui/material';
import { ErrorMessage, useFormikContext } from 'formik';
import SearchIcon from '@mui/icons-material/Search';

interface Option {
  value: string | number | any;
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
  options = [],
  handleChange,
  handleBlur,
  ...rest
}: FormSelectProps) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');

  let isInsideFormik = false;
  try {
    const formik = useFormikContext();
    if (formik) isInsideFormik = true;
  } catch {
    isInsideFormik = false;
  }

  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(searchText.toLowerCase()));
  }, [options, searchText]);

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
        {...(handleBlur && { onBlur: handleBlur })}
        sx={{
          backgroundColor: 'white',
          fontFamily: theme.typography.fontFamily,
          textTransform: 'capitalize',
        }}
        slotProps={{
          inputLabel: {
            sx: { fontSize: '0.8rem' },
          },
          input: {
            sx: { fontSize: '0.8rem' },
          },
        }}
        SelectProps={{
          MenuProps: {
            disableAutoFocusItem: true,
          },
        }}
        {...rest}
      >
        {options.length > 10 && (
          <ListSubheader>
            <TextField
              size='small'
              autoFocus
              placeholder='Type to search...'
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListSubheader>
        )}

        {filteredOptions.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.8rem',
              textTransform: 'capitalize',
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

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

export default FormSelect;
