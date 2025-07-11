import { Box } from '@mui/material';
import { DualProgressCircle, HoverShadowWrapper, Loader } from '../../../../components';
import { useStudentList } from '../../../../hooks';

export default function GenderProgress() {
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
    <HoverShadowWrapper>
      <Box
        sx={{
          p: 2,
        }}
      >
        {isLoading && <Loader />}
        <DualProgressCircle data={stats} colors={['rgb(44, 218, 157)', 'rgb(148, 147, 152)']} />
      </Box>
    </HoverShadowWrapper>
  );
}
