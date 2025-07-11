import { Box, Typography, CircularProgress } from '@mui/material';

type CategoryData = {
  [label: string]: number;
};

type Props = {
  data: CategoryData; // Must contain exactly two keys
  colors?: string[]; // Optional: allow custom color override
};

export default function DualProgressCircle({ data, colors = ['#1976d2', '#e91e63'] }: Props) {
  const entries = Object.entries(data);
  if (entries.length !== 2) {
    console.error('DualProgressCircle expects exactly two categories.');
    return null;
  }

  const [[label1, value1], [label2, value2]] = entries;
  const total = value1 + value2;
  const percentage1 = total === 0 ? 0 : (value1 / total) * 100;

  return (
    <Box display='flex' alignItems='center'>
      <Box position='relative' display='inline-flex'>
        {/* Base Circle (second value) */}
        <CircularProgress
          variant='determinate'
          value={100}
          sx={{ color: colors[1] }}
          size={100}
          thickness={4}
        />
        {/* Overlay Circle (first value) */}
        <CircularProgress
          variant='determinate'
          value={percentage1}
          sx={{
            color: colors[0],
            position: 'absolute',
            left: 0,
          }}
          size={100}
          thickness={4}
        />
        {/* Center text */}
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='caption' component='div' color='textSecondary'>
            {total} total
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box ml={4} display='flex' flexDirection='column' gap={1}>
        <Box display='flex' alignItems='center' gap={1}>
          <Box width={12} height={12} borderRadius='50%' bgcolor={colors[0]} />
          <Typography variant='body2'>
            {label1}: {value1}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' gap={1}>
          <Box width={12} height={12} borderRadius='50%' bgcolor={colors[1]} />
          <Typography variant='body2'>
            {label2}: {value2}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
