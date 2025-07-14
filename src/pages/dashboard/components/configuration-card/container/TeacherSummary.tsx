import { Box, Button, Divider, Typography } from '@mui/material';
import { Loader } from '../../../../../components';
import { useGetSchoolClass } from '../../../../../hooks';
import { useNavigate } from 'react-router-dom';

export default function TeacherSummary() {
  const navigate = useNavigate();

  const { data: schoolClass, isLoading } = useGetSchoolClass();
  const classList = schoolClass?.data || [];

  const classWithSubjects = classList?.reduce((count: any, curr: any) => {
    return Array.isArray(curr.teacherClasses) && curr.teacherClasses.length > 0 ? count + 1 : count;
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
          Assigned form teachers
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/dashboard/classes')}
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
          <Typography variant='subtitle1' fontSize={'0.875rem'} color='#68aa22' fontWeight={900}>
            {classWithSubjects}
          </Typography>
          <Typography variant='subtitle1' fontSize={10}>
            Classes with form teacher
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' fontSize={'0.875rem'}>
            {classList.length - classWithSubjects}
          </Typography>
          <Typography variant='subtitle1' fontSize={10}>
            Classes without form teacher
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
