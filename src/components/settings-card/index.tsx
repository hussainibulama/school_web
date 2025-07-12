import { useState, ElementType } from 'react';
import { Box, Typography } from '@mui/material';

interface SettingsCardProps {
  label: string;
  onClick?: () => void;
  icon?: ElementType;
}

export default function SettingsCard({ label, onClick, icon: Icon }: SettingsCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        height: 90,
        width: 'auto',
        background: hover
          ? 'linear-gradient(135deg, rgba(104, 170, 34, 0.3) 0%, rgba(254, 196, 33, 0.3) 100%)'
          : 'transparent',
        borderRadius: 1,
        border: '1px solid rgb(216, 216, 227)',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: hover ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        userSelect: 'none',
        p: 1,
        // Add keyboard accessibility if clickable
        outline: 'none',
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(104, 170, 34, 0.6)',
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Box color='#68aa22'>{Icon && <Icon height='20px' width='20px' />}</Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant='body1'
          fontWeight={600}
          sx={{
            whteSpace: 'nowrap',
            color: 'rgb(56, 58, 61)',
            transition: 'color 0.3s ease',
            userSelect: 'none',
            fontSize: '12px',
            pr: 5,
          }}
        >
          {label}
        </Typography>

        <Box
          component='span'
          sx={{
            transition: 'transform 0.3s ease, color 0.3s ease',
            transform: hover ? 'translateX(6px)' : 'translateX(0)',
            fontSize: 20,
            color: 'rgb(172, 179, 195)',
            userSelect: 'none',
          }}
        >
          →
        </Box>
      </Box>
    </Box>
  );
}
