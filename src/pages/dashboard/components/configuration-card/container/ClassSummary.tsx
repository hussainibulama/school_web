import { Box, Button, Divider, Typography } from '@mui/material';
import { Loader } from '../../../../../components';
import { useNavigate } from 'react-router-dom';
import { useGetStudentsLinkWithClass, useStudentList } from '../../../../../hooks';

export default function ClassSummary() {
  const navigate = useNavigate();

  const { data: students, isLoading } = useStudentList();
  const studentsList = students?.data || [];

  const { data: studentWithClass, isLoading: _isLoading } = useGetStudentsLinkWithClass();
  const studentWithClassList = studentWithClass?.data || [];

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
      {(isLoading || _isLoading) && <Loader />}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Typography variant='subtitle1' fontWeight={600} fontSize={'0.875rem'}>
          Assigned to classes
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/dashboard/student')}
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
          <Typography
            variant='subtitle1'
            fontSize={'0.875rem'}
            color='rgba(15, 168, 114, 1)'
            fontWeight={900}
          >
            {studentWithClassList.length}
          </Typography>
          <Typography variant='subtitle1' fontSize={10}>
            Students With Class
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' fontSize={'0.875rem'}>
            {studentsList.length - studentWithClassList.length}
          </Typography>
          <Typography variant='subtitle1' fontSize={10}>
            Students Without Class
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
