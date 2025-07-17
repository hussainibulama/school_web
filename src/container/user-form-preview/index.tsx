import { Box, Typography, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';

interface IUserFormPreviewProps {
  values: any;
  preview?: string | null;
  isStudent?: boolean;
}

export default function UserFormPreview({
  values,
  preview,
  isStudent = false,
}: IUserFormPreviewProps) {
  const fields = [
    {
      label: 'Full Name',
      value: `${values?.firstName || ''} ${values?.middleName || ''} ${values?.lastName || ''}`,
    },
    ...(isStudent ? [] : [{ label: 'Email', value: values?.email || '' }]),
    { label: 'Phone Number', value: values?.phone || '' },
    { label: 'Gender', value: values.gender === 'm' ? 'Male' : 'Female' },
    { label: 'Date of Birth', value: values?.dob || '' },
    { label: 'Role', value: values?.role || '' },
    { label: 'Address', value: values?.address || '' },
  ];

  return (
    <>
      {/* Preview Section */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          padding: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {/* Avatar */}
        <Box display='flex' flexDirection='column' alignItems='center' minWidth={120}>
          <Avatar src={preview || undefined} sx={{ width: 80, height: 80, mb: 1 }}>
            {!preview && <Person />}
          </Avatar>
          <Typography variant='subtitle2'>Photo</Typography>
        </Box>

        {/* Staff Fields */}
        <Box flex={1} display='flex' flexWrap='wrap' gap={2}>
          {fields.map((field) => (
            <Box
              key={field.label}
              flexBasis='30%'
              minWidth={160}
              display='flex'
              flexDirection='column'
              gap={0.5}
            >
              <Typography variant='caption' color='textSecondary' sx={{ fontWeight: 500 }}>
                {field.label}
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {field.value || '-'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Info Note Section */}
      <Box
        sx={{
          mt: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          padding: 2,
          backgroundColor: 'transparent',
        }}
      >
        <Typography variant='body2' color='textSecondary' sx={{ lineHeight: 1.6 }}>
          This staff will be created once you click the <strong>Finish</strong> button. Ensure all
          the details are correct and verified before proceeding. If any details are incorrect,
          please click the <strong>Previous</strong> button to go back to the relevant page and
          correct it.
        </Typography>
      </Box>
    </>
  );
}
