import { Box, Divider, Typography } from '@mui/material';
import { ClassSummary, SubjectSummary, TeacherSummary, ClassesCount, ArmsCount } from './container';
export default function ConfigurationCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid rgb(216, 216, 227)',
        borderRadius: 2,
        my: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          m: 0,
        }}
      >
        <Typography variant='subtitle1' fontWeight={600} fontSize={'0.875rem'}>
          Class, Subject & Form Teacher Configuration
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
        }}
      >
        <Box display='flex' sx={{ flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <ClassesCount />
          <ArmsCount />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2, // spacing between items
            justifyContent: 'space-between', // or 'flex-start' / 'center' depending on your design
          }}
        >
          <Box sx={{ flex: '1 1 30%', minWidth: 250 }}>
            <ClassSummary />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 250 }}>
            <SubjectSummary />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 250 }}>
            <TeacherSummary />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
