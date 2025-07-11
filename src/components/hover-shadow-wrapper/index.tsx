import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface HoverShadowWrapperProps extends BoxProps {
  children: React.ReactNode;
  hoverShadow?: string;
  borderRadius?: number | string;
}

export default function HoverShadowWrapper({
  children,
  hoverShadow = 'rgba(47, 5, 187, 0.2) 1px 6px 15px',
  borderRadius = 2,
  ...rest
}: HoverShadowWrapperProps) {
  return (
    <Box
      {...rest}
      sx={{
        transition: 'box-shadow 0.3s ease',
        borderRadius,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: hoverShadow,
        },
        width: '100%',
        height: '100%',
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
}
