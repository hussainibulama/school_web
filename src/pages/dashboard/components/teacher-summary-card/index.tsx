import { Box, Typography } from '@mui/material';
import { DualProgressCircle, Loader } from '../../../../components';
import { useGetStaffList } from '../../../../hooks';

function TeacherSummaryCard() {
  const { data: staff, isLoading } = useGetStaffList();
  const staffList = staff?.data || [];

  const stats = staffList?.reduce(
    (acc: any, user: any) => {
      if (['teacher', 'proprietor'].includes(user.role)) acc['Academic']++;
      if (user.role === 'admin') acc['Non Academic']++;

      return acc;
    },
    {
      Academic: 0,
      'Non Academic': 0,
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
        Staff Summary
      </Typography>
      <DualProgressCircle data={stats} />
    </Box>
  );
}

export default TeacherSummaryCard;
