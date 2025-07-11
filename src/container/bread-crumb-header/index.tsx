import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { LessThan } from '../../assets';

interface BreadcrumbHeaderProps {
  title?: string;
}

export default function BreadcrumbHeader({ title }: BreadcrumbHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  const segments = location.pathname.split('/').filter(Boolean);
  const secondLastSegment = segments.length > 1 ? segments[segments.length - 2] : 'Back';
  return (
    <Box
      display='flex'
      alignItems='center'
      gap={0.5}
      sx={{
        fontSize: '11px',
      }}
    >
      <Button
        variant='text'
        onClick={handleGoBack}
        startIcon={
          <Box
            component='span'
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              fontSize: 10,
              m: 0,
            }}
          >
            <LessThan height='10px' width='10px' />
          </Box>
        }
        sx={{
          minWidth: 'fit-content',
          fontSize: '11px',
          textTransform: 'Capitalize',
          color: '#68aa22',
          fontWeight: 900,
          p: 0,
          '& .MuiButton-startIcon': {
            marginRight: 0.2, // Remove the default right margin
          },
        }}
      >
        {secondLastSegment}
      </Button>
      {title && (
        <Typography
          sx={{
            fontSize: '11px',
            color: 'rgba(0, 0, 0, 0.6)',
            textTransform: 'capitalize',
          }}
        >
          / {title}
        </Typography>
      )}
    </Box>
  );
}
