import { Box } from '@mui/material';
import { DualProgressCircle, HoverShadowWrapper, Loader } from '../../../../components';
import { useStudentList } from '../../../../hooks';

export default function StudentProgress() {
  const { data: staff, isLoading } = useStudentList();
  const staffList = staff?.data || [];

  const stats = staffList?.reduce(
    (acc: any, user: any) => {
      // Role count
      if (['teacher', 'proprietor'].includes(user.role)) acc.Academic++;
      if (user.role === 'admin') acc.Admin++;

      return acc;
    },
    {
      Academic: 0,
      Admin: 0,
    },
  );
  return (
    <HoverShadowWrapper>
      <Box
        flex={1}
        sx={{
          p: 2,
        }}
      >
        {isLoading && <Loader />}
        <DualProgressCircle data={stats} colors={['#68aa22', 'rgb(91, 13, 38)']} />
      </Box>
    </HoverShadowWrapper>
  );
}
