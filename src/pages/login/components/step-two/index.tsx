import { Box, Stack, Typography, Avatar, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

interface School {
  schoolId: string;
  schoolName: string;
  schoolLogo?: string;
}

interface StepSchoolSelectionProps {
  email: string;
  schools: School[];
  selectedSchool: School | null;
  onSelect: (school: School) => void;
  onBack: () => void;
  onContinue: () => void;
}

const StepTwo = ({
  email,
  schools,
  selectedSchool,
  onSelect,
  onBack,
  onContinue,
}: StepSchoolSelectionProps) => (
  <Stack spacing={2} sx={{ width: '100%' }}>
    <Box display='flex' alignItems='center'>
      <IconButton onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
    <Typography
      variant='h4'
      align='center'
      fontWeight='bold'
      sx={{
        fontFamily: `"Inter", sans-serif`,
        color: 'rgb(56, 58, 63)',
        fontSize: '28px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
      }}
    >
      Select your school
    </Typography>
    <Typography
      variant='body2'
      align='center'
      sx={{
        fontFamily: `"Inter", sans-serif`,
        fontSize: '12px',
        color: 'rgb(56, 58, 63)',
      }}
    >
      Which school would you like to sign into?
    </Typography>
    <Stack spacing={1}>
      {schools.map((school) => {
        const isSelectedSchool = selectedSchool?.schoolId === school.schoolId;
        return (
          <Box
            key={school.schoolId}
            display='flex'
            alignItems='center'
            gap={2}
            p={0.5}
            border={`1px solid ${isSelectedSchool ? `rgb(0, 102, 245)` : `#ccc`}`}
            borderRadius='8px'
            sx={{
              cursor: 'pointer',
              backgroundColor: 'white',
              boxShadow: isSelectedSchool ? 'rgba(0, 102, 245, 0.5) 0px 1px 5px 1px' : 'none',
            }}
            onClick={() => onSelect(school)}
          >
            <Avatar src={school.schoolLogo} sx={{ backgroundColor: 'lightgray' }}>
              {!school.schoolLogo && <PersonIcon sx={{ color: 'white' }} />}
            </Avatar>
            <Typography
              sx={{
                fontFamily: `"Inter", sans-serif`,
                color: isSelectedSchool ? 'rgb(0, 102, 245)' : 'rgb(56, 58, 63)',
                fontSize: '12px',
              }}
            >
              {school.schoolName}
            </Typography>
          </Box>
        );
      })}
    </Stack>
    <Button
      variant='contained'
      fullWidth
      disabled={!selectedSchool}
      onClick={onContinue}
      sx={{ textTransform: 'capitalize', fontFamily: `"Inter", sans-serif` }}
    >
      Continue
    </Button>
  </Stack>
);
export default StepTwo;
