import { useGetSchoolClass } from '../../../../hooks';
import { Box, Avatar, Typography, CircularProgress } from '@mui/material';
import { Person } from '@mui/icons-material';

interface IFormTeacherCardProps {
  schoolClassId: string;
}

export default function FormTeacherCard({ schoolClassId }: IFormTeacherCardProps) {
  const { data: classes, isLoading } = useGetSchoolClass();

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height={100}>
        <CircularProgress />
      </Box>
    );
  }

  const classRoom =
    classes?.data?.find((entry: any) => entry.schoolClassId === schoolClassId) || {};
  const Teacher = classRoom?.teacherClasses?.[0] || {};

  const teacherData = Teacher?.teacher || {};
  const name =
    `${teacherData?.first_name || ''} ${teacherData?.middle_name || ''} ${teacherData?.last_name || ''}`.trim();
  const email = teacherData?.email || '';
  const role = 'Teacher';

  return (
    <Box
      height='300px'
      borderRadius={2}
      overflow='hidden'
      width={450}
      sx={{
        position: 'relative',
        border: '1px solid rgb(216, 216, 227)',
        display: 'flex',
        alignItems: 'center',

        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          width: '100%',
          zIndex: -1,
          height: '32%',
          backgroundColor: 'rgb(239, 239, 243)',
        },
      }}
    >
      <Box height='100%' display='flex' alignItems='center' padding={2} bgcolor='transparent'>
        <Avatar sx={{ width: 150, height: 150, marginRight: 2 }}>
          <Person sx={{ height: 100, width: 100 }} />
        </Avatar>
        <Box>
          <Box
            sx={{
              backgroundColor: 'rgb(220 189 116)',
              borderRadius: 2,
              px: 1,
              py: 0.3,
              width: 'fit-content',
            }}
          >
            <Typography variant='body2' color='textSecondary'>
              Form Teacher
            </Typography>
          </Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            {name || 'N/A'}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {email || 'No email'}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {role}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
