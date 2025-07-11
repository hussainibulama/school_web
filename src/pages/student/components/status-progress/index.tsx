import { Box } from '@mui/material';
import { DualProgressCircle, HoverShadowWrapper, Loader } from '../../../../components';
import { useStudentList } from '../../../../hooks';

export default function StatusProgress() {
  const { data: student, isLoading } = useStudentList();
  const studentList = student?.data || [];

  const stats = studentList.reduce(
    (acc: any, user: any) => {
      if (user.active === true) acc.Active++;
      if (user.active === false) acc.Deactivated++;

      return acc;
    },
    {
      Active: 0,
      Deactivated: 0,
    },
  );
  return (
    <HoverShadowWrapper>
      <Box
        sx={{
          p: 2,
        }}
      >
        {isLoading && <Loader />}
        <DualProgressCircle data={stats} />
      </Box>
    </HoverShadowWrapper>
  );
}
