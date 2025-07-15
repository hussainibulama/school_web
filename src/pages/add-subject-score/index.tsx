import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Divider, Avatar, darken, useTheme } from '@mui/material';

import { useGetClassStudentById } from '../../hooks';
import { useParams } from 'react-router-dom';
import { BreadcrumbHeader } from '../../container';
import { Person } from '@mui/icons-material';
import { IdCardIcon } from '../../assets';
import { ScoreForm } from './components';

export default function AddSubjectScore() {
  const theme = useTheme();
  const { schoolClassId } = useParams();
  const { data: student } = useGetClassStudentById(schoolClassId);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    const studentList = student?.data || [];
    return studentList.filter((s: any) => {
      const name =
        `${s?.student?.firstName || ''} ${s?.student?.middleName || ''} ${s?.student?.lastName || ''}`.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, student]);

  return (
    <Box width='100%'>
      {/* Header */}
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <BreadcrumbHeader backTitle='Subjects' title='Add Assessment' />
      </Box>

      <Box
        display='flex'
        minHeight='calc(100vh - 150px)'
        border='1px solid #eee'
        borderRadius={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {/* Left - Student List */}
        <Box
          sx={{
            width: { xs: '100%', sm: '30%' },
            height: { xs: '50%', sm: 'auto' },
            overflowY: 'auto',
            borderRight: { xs: 'none', sm: '1px solid #ddd' },
            borderBottom: { xs: '1px solid #ddd', sm: 'none' },
          }}
        >
          <Box p={2}>
            <Typography variant='subtitle1' fontWeight={600}>
              Students
            </Typography>
          </Box>
          <Divider />
          <Box p={2}>
            <TextField
              placeholder='Search student...'
              size='small'
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  sx: {
                    fontSize: '12px', // Input text
                    fontFamily: theme.typography.fontFamily,
                    '::placeholder': {
                      fontSize: '12px', // Placeholder
                      opacity: 1, // Ensure visibility
                    },
                  },
                },
              }}
            />
          </Box>

          {/* Custom-styled student entries */}
          {filteredStudents?.map((s: any) => {
            const studentId = s?.student?.userId;
            const name = `${s?.student?.firstName || ''} ${s?.student?.middleName || ''} ${s?.student?.lastName || ''}`;
            const isSelected = selectedStudentId === studentId;

            return (
              <Box
                key={studentId}
                onClick={() => {
                  setSelectedStudentId(studentId);
                }}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgb(19, 172, 221)' : '#f9f9f9',
                  color: isSelected ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: isSelected ? darken('rgb(19, 172, 221)', 0.2) : '#efefef',
                  },
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{ width: 36, height: 36, background: 'rgba(210, 210, 219, 1)' }}
                  src={s.student?.avatarUrl || undefined} // Use avatarUrl if available
                >
                  <Person />
                </Avatar>
                <Typography variant='body2' fontWeight={500} fontSize={14}>
                  {name.trim()}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Right - Input Form */}
        <Box
          flex={1}
          sx={{ width: { xs: '100%', sm: '70%' }, height: { xs: '50%', sm: 'auto' }, flexFlow: 1 }}
        >
          {selectedStudentId ? (
            <ScoreForm studentId={selectedStudentId} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgb(19, 172, 221)',
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    zIndex: 0,
                  },
                  svg: {
                    position: 'relative',
                    zIndex: 1,
                    color: '#fff',
                  },
                }}
              >
                <IdCardIcon height={70} width={70} />
              </Box>
              <Typography variant='subtitle1' fontWeight={600}>
                Select a student
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Select from the list to the left or top for mobile.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
