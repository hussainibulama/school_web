import { DualProgressCircle, Loader } from '../../../../components';
import { Box, Typography } from '@mui/material';
import { useStudentList } from '../../../../hooks';

function StudentSummaryCard() {
  const { data: student, isLoading } = useStudentList();
  const studentList = student?.data || [];

  const stats = studentList.reduce(
    (acc: any, user: any) => {
      if (user.gender === 'm') acc.Male++;
      if (user.gender === 'f') acc.Female++;
      return acc;
    },
    {
      Male: 0,
      Female: 0,
    },
  );
  return (
    <Box
      sx={{
        border: '1px solid rgb(216, 216, 227)',
        p: 2,
        borderRadius: 1,
      }}
    >
      {isLoading && <Loader />}

      <Typography variant='subtitle1' fontWeight={600} mb={2}>
        Student Summary
      </Typography>
      <DualProgressCircle data={stats} colors={['#68aa22', 'rgb(251 184 33)']} />
    </Box>
  );
}

export default StudentSummaryCard;
