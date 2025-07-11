import { Box } from '@mui/material';
import { DualProgressCircle, HoverShadowWrapper, Loader } from '../../../../components';
import { useGetStaffList } from '../../../../hooks';

export default function StaffProgress() {
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
