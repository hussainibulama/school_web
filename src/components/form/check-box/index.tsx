import React from 'react';
import { Box, Checkbox, Typography, useTheme, CheckboxProps } from '@mui/material';

interface CheckBoxProps extends CheckboxProps {
  label?: string;
  labelColor?: string;
  labelFontSize?: number;
  labelGap?: number;
}

export default function CheckBox({
  label = 'Remember me',
  labelColor = '#776e6a',
  labelFontSize = 14,
  labelGap = 0,
  size = 'small',
  sx,
  id,
  ...rest
}: CheckBoxProps) {
  const theme = useTheme();
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Box
      component='label'
      htmlFor={checkboxId}
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <Checkbox id={checkboxId} size={size} disableRipple sx={{ p: 0, ...sx }} {...rest} />
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          color: labelColor,
          fontSize: labelFontSize,
          ml: labelGap,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
