import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { PencilIcon } from '../../assets';
import { Loader } from '../../components';

interface IViewProfileProps {
  values: any;
  preview?: string | null;
  onEdit?: () => void;
  isLoading?: boolean;
}

export default function ViewProfile({ values, preview, onEdit, isLoading }: IViewProfileProps) {
  const fields = [
    {
      label: 'Full Name',
      value: `${values?.firstName || ''} ${values?.middleName || ''} ${values?.lastName || ''}`,
    },
    { label: 'Email', value: values?.email || '' },
    { label: 'Phone Number', value: values?.phone || '' },
    { label: 'Gender', value: values.gender === 'm' ? 'Male' : 'Female' },
    { label: 'Date of Birth', value: values?.dob || '' },
    { label: 'Role', value: values?.role || '' },
    { label: 'Address', value: values?.address || '' },
  ];

  return (
    <Box position='relative'>
      {/* Loader Overlay */}
      {isLoading && <Loader />}

      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: '100%',
        }}
      >
        {/* Header Section */}
        <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
          <Box display='flex' alignItems='center' gap={2}>
            <Box
              sx={{
                background: 'rgb(240, 168, 168)',
              }}
              borderRadius={3}
            >
              <Avatar
                src={preview || undefined}
                sx={{ width: 80, height: 80, bgcolor: 'rgb(232 232 237)' }}
              />
            </Box>

            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' sx={{ fontWeight: 600 }} textTransform='capitalize'>
                {`${values?.firstName || ''} ${values?.middleName || ''} ${values?.lastName || ''}`}
              </Typography>
              <Typography variant='body2' color='textSecondary' textTransform='capitalize'>
                {values.role === 'proprietor' ? '⭐ Super Admin' : values.role || 'N/A'}
              </Typography>
            </Box>
          </Box>
          <Button
            variant='outlined'
            onClick={onEdit}
            startIcon={<PencilIcon height='20px' width='20px' />}
            sx={{
              backgroundColor: '#68aa22',
              color: 'white',
              textTransform: 'capitalize',
              height: '30px',
            }}
          >
            Edit
          </Button>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Profile Fields */}
        <Box display='flex' flexWrap='wrap' gap={3}>
          {fields.map((field) => (
            <Box
              key={field.label}
              flexBasis='calc(25% - 18px)'
              minWidth={160}
              display='flex'
              flexDirection='column'
              gap={0.5}
            >
              <Typography
                variant='caption'
                color='textSecondary'
                sx={{ fontWeight: 500, fontSize: 14 }}
              >
                {field.label}
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 14 }}>
                {field.value || '-'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
