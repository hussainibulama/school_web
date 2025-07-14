import { Box, Typography, LinearProgress, Divider } from '@mui/material';
import { useGetSchoolSessions } from '../../../../hooks';

const TermProgress = () => {
  const { data: session } = useGetSchoolSessions();
  const currentSession = session?.data?.find((entry: any) => entry.isCurrent);

  const currentTerm = currentSession?.currentTerm || 1;

  const termDates: any = {
    1: {
      start: currentSession?.firstTermStart,
      end: currentSession?.firstTermEnd,
    },
    2: {
      start: currentSession?.secondTermStart,
      end: currentSession?.secondTermEnd,
    },
    3: {
      start: currentSession?.thirdTermStart,
      end: currentSession?.thirdTermEnd,
    },
  };

  const startDate = new Date(termDates[currentTerm]?.start || '');
  const endDate = new Date(termDates[currentTerm]?.end || '');
  const today = new Date();

  const isValidRange =
    !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate < endDate;

  let progress = 0;
  if (isValidRange) {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = today.getTime() - startDate.getTime();
    progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }

  const todayStr = today.toDateString();
  const startStr = isValidRange ? startDate.toDateString() : 'N/A';
  const endStr = isValidRange ? endDate.toDateString() : 'N/A';

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid rgb(216, 216, 227)',
        borderRadius: 2,
        p: 2,
        mb: 3,
      }}
    >
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        Current Term Progress
      </Typography>

      <Typography variant='body2' color='text.secondary' gutterBottom>
        Today: {todayStr}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='caption'>Start: {startStr}</Typography>
        <Typography variant='caption'>End: {endStr}</Typography>
      </Box>

      <Box title={`Today: ${todayStr}`}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>

      <Typography variant='caption' sx={{ mt: 1, display: 'block', textAlign: 'right' }}>
        {Math.floor(progress)}% Complete
      </Typography>
    </Box>
  );
};

export default TermProgress;
