import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface IAbsoluteCenterWrapperProp {
  children?: ReactNode;
}

export default function AbsoluteCenterWrapper({ children }: IAbsoluteCenterWrapperProp) {
  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex={1}
      bgcolor='rgba(255,255,255,0.6)'
    >
      {children}
    </Box>
  );
}
