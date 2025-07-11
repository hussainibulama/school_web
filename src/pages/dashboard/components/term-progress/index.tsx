import React from 'react';
import { Box, Typography, LinearProgress, Divider } from '@mui/material';

const TermProgress = () => {
  const today = new Date();
  const todayString = today.toDateString();

  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 2);

  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 1);

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();

  const progress = (elapsedDuration / totalDuration) * 100;

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
        Today: {todayString}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='caption'>{startDate.toDateString()}</Typography>
        <Typography variant='caption'>{endDate.toDateString()}</Typography>
      </Box>

      <Box title={`Today: ${todayString}`}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>

      <Typography variant='caption' sx={{ mt: 1, display: 'block', textAlign: 'right' }}>
        {Math.floor(progress)}% Complete
      </Typography>
    </Box>
  );
};

export default TermProgress;
