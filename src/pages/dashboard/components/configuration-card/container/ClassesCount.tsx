import { Box, Typography } from '@mui/material';
import { ClassSectionIcon } from '../../../../../assets';
import { useGetSchoolClass } from '../../../../../hooks';

export default function ClassesCount() {
  const { data: schoolClasses } = useGetSchoolClass();
  const schoolClassesList = schoolClasses?.data || [];
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
        <ClassSectionIcon height='25px' width='25px' />
      </Box>
      <Box>
        <Typography
          variant='subtitle1'
          fontSize={'22px'}
          color='rgba(15, 168, 114, 1)'
          fontWeight={900}
        >
          {schoolClassesList.length}
        </Typography>
        <Typography variant='subtitle1' fontSize={12}>
          Class levels created
        </Typography>
      </Box>
    </Box>
  );
}
