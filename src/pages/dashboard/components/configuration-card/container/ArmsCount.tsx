import { Box, Typography } from '@mui/material';
import { ClassArmIcon } from '../../../../../assets';
import { useGetClassArms } from '../../../../../hooks';

export default function ArmsCount() {
  const { data: classArms } = useGetClassArms();
  const classArmsList = classArms?.data || [];
  return (
    <Box
      display='flex'
      sx={{
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          color: 'rgb(157, 157, 183)',
          background: 'rgb(250, 248, 249)',
          width: 80,
          height: 80,
        }}
      >
        <ClassArmIcon height='25px' width='25px' />
      </Box>
      <Box>
        <Typography
          variant='subtitle1'
          fontSize={'22px'}
          color='rgba(15, 168, 114, 1)'
          fontWeight={900}
        >
          {classArmsList.length}
        </Typography>
        <Typography variant='subtitle1' fontSize={12}>
          Class arms created
        </Typography>
      </Box>
    </Box>
  );
}
