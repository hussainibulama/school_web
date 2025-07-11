import { DualProgressCircle, Loader } from '../../../../components';
import { Box, Typography } from '@mui/material';
import { useParentList } from '../../../../hooks';

function ParentSummaryCard() {
  const { data: parent, isLoading } = useParentList();
  const parentList = parent?.data || [];

  const stats = parentList.reduce(
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
        Parents Summary
      </Typography>
      <DualProgressCircle data={stats} colors={['rgb(44, 218, 157)', 'rgb(148, 147, 152)']} />
    </Box>
  );
}

export default ParentSummaryCard;
