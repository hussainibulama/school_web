import React from 'react';
import { Box, keyframes, useTheme } from '@mui/material';

// Rotation keyframes
const orbit = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function Loader() {
  const theme = useTheme();
  const ballCount = 4;
  const radius = 16;

  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={20}
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='rgba(255, 255, 255, 0.5)'
      borderRadius={2}
    >
      <Box
        width={80}
        height={80}
        position='relative'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            animation: `${orbit} 1s linear infinite`,
          }}
        >
          {Array.from({ length: ballCount }).map((_, i) => {
            const angle = (360 / ballCount) * i;
            const rad = (angle * Math.PI) / 180;

            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            return (
              <Box
                key={i}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  position: 'absolute',
                  top: `calc(50% + ${y}px - 5px)`,
                  left: `calc(50% + ${x}px - 5px)`,
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
