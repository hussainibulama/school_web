import { Box, Button, Divider, Typography } from '@mui/material';
import { useGetSchoolClass } from '../../../../../hooks';
import { Loader } from '../../../../../components';
import { useNavigate } from 'react-router-dom';

export default function SubjectSummary() {
  const navigate = useNavigate();

  const { data: schoolClass, isLoading } = useGetSchoolClass();
  const classList = schoolClass?.data || [];

  const classWithSubject = classList?.reduce((count: any, curr: any) => {
    return Array.isArray(curr.subjects) && curr.subjects.length > 0 ? count + 1 : count;
  }, 0);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        border: '1px solid rgb(216, 216, 227)',
        borderRadius: 1,
      }}
    >
      {isLoading && <Loader />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Typography variant='subtitle1' fontWeight={600} fontSize={'0.875rem'}>
          Assigned subjects
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/dashboard/settings/subjects')}
          sx={{
            background: 'rgb(56, 58, 63)',
            py: 0.4,
            textTransform: 'capitalize',
          }}
        >
          Edit Config
        </Button>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, flexWrap: 'wrap' }}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' fontSize={'0.875rem'} color='#1976d2' fontWeight={900}>
            {classWithSubject}
          </Typography>
          <Typography variant='subtitle1' fontSize={10}>
            Classes With Subject
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' fontSize={'0.875rem'}>
            {classList.length - classWithSubject}
          </Typography>
          <Typography variant='subtitle1' fontSize={10}>
            Classes Without Subject
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
