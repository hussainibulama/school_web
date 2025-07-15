import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useParams } from 'react-router';

import {
  useCreateStudentResult,
  useGetClassStudentById,
  useGetGeneralSubjects,
  useGetSchoolSessions,
  useGetStudentResultById,
} from '../../../../hooks';
import { useSnackbar } from '../../../../hoc';
import { Loader } from '../../../../components';

type ScoreFields = {
  firstCa: string;
  secondCa: string;
  exam: string;
  remark: string;
};

export default function ScoreForm({ studentId = '' }: { studentId?: string }) {
  const { schoolClassId = '', subjectId = '' } = useParams();
  const theme = useTheme();

  const { data: studentData, isLoading } = useGetClassStudentById(schoolClassId);
  const { data: subjectsData, isLoading: _isLoading } = useGetGeneralSubjects();

  const { data: session } = useGetSchoolSessions();
  const currentSession = session?.data?.find((entry: any) => entry.isCurrent);

  const { data: results, isLoading: __isLoading } = useGetStudentResultById({
    studentId,
    subjectId,
    academicYear: `${currentSession?.currentTerm || 1}`,
    academicTerm: currentSession?.academicYear || '',
  });

  const [scores, setScores] = useState<ScoreFields>({
    firstCa: '',
    secondCa: '',
    exam: '',
    remark: '',
  });

  useEffect(() => {
    setScores({
      firstCa: `${results?.data?.[0]?.firstCaScore || ''}`,
      secondCa: `${results?.data?.[0]?.secondCaScore || ''}`,
      exam: `${results?.data?.[0]?.examScore || ''}`,
      remark: `${results?.data?.[0]?.remark || ''}`,
    });
  }, [studentId, results]);

  const subjectName = useMemo(() => {
    const subjectList = subjectsData?.data || [];
    return subjectList.find((s: any) => s?.subjectId === subjectId)?.subjectName || '';
  }, [subjectsData, subjectId]);

  const { student: Student, class: ClassRoom } = useMemo(() => {
    const studentList = studentData?.data || [];
    return studentList.find((s: any) => s?.student?.userId === studentId);
  }, [studentId, studentData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'remark' || /^\d{0,2}$/.test(value)) {
      setScores((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { mutate: createStudentResult, isPending } = useCreateStudentResult();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = () => {
    createStudentResult(
      {
        schoolClassId,
        studentId,
        subjectId,
        academicYear: `${currentSession?.currentTerm || 1}`,
        academicTerm: currentSession?.academicYear || '',
        firstCaScore: Number(scores?.firstCa),
        secondCaScore: Number(scores?.secondCa),
        examScore: Number(scores?.exam),
        ...(scores?.remark && { remark: scores.remark }),
      },
      {
        onSuccess: () => {
          showSnackbar('Result Updated Successfully', 'success');
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || 'Unable to create result at the moment',
            'error',
          );
        },
      },
    );
  };

  const studentName = `${Student?.firstName || ''} ${Student?.middleName || ''} ${Student?.lastName || ''}`;

  const sharedInputStyles = {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: 0,
    fontFamily: theme.typography.fontFamily,
    '& input': {
      fontSize: '0.875rem',
      color: '#3b3737ff',
      '&::placeholder': {
        fontSize: '0.875rem',
        color: '#999',
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { border: 'none' },
      '&:hover fieldset': { border: 'none' },
      '&.Mui-focused fieldset': { border: 'none' },
    },
    '& .MuiInputBase-input': {
      textAlign: 'center',
      border: 'none',
    },
  };

  return (
    <Box>
      {/* Header */}
      <Box px={2} py={1} display='flex' alignItems='center' gap={2}>
        <Avatar
          src={Student?.avatarUrl || undefined}
          sx={{ width: 36, height: 36, background: 'rgba(210, 210, 219, 1)' }}
        >
          <Person />
        </Avatar>
        <Box>
          <Typography variant='subtitle1' fontWeight={600}>
            {studentName.trim()}
          </Typography>
          <Typography variant='body2' fontWeight={400} textTransform='capitalize'>
            {ClassRoom?.label || ''}
          </Typography>
        </Box>
      </Box>
      <Divider />

      <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
        {/* Table Header */}
        <Box
          display='grid'
          border='1px solid #eee'
          borderRadius='4px 4px 0 0'
          overflow='hidden'
          sx={{
            gridTemplateColumns: {
              xs: 'minmax(100px, 1fr) repeat(3, minmax(50px, 1fr))',
              sm: '1fr 80px 80px 80px',
            },
          }}
        >
          {['Subject', '1st CA', '2nd CA', 'Exam'].map((label, index) => (
            <Box
              key={label}
              p={1}
              sx={{
                backgroundColor: '#f7f7f7',
                fontWeight: 600,
                borderRight: index < 3 ? '1px solid #eee' : 'none',
              }}
            >
              <Typography variant='body2' sx={{ fontSize: 14, color: '#a9a0a0ff' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
        {isLoading ||
          _isLoading ||
          (__isLoading && (
            <Box position='relative'>
              <Loader />
            </Box>
          ))}
        {/* Score Row */}
        <Box
          display='grid'
          alignItems='center'
          bgcolor='#f7f7f7'
          border='1px solid #eee'
          borderTop='none'
          sx={{
            gridTemplateColumns: {
              xs: 'minmax(100px, 1fr) repeat(3, minmax(50px, 1fr))',
              sm: '1fr 80px 80px 80px',
            },
          }}
        >
          <Box p={1} sx={{ borderRight: '1px solid #eee' }}>
            <Typography variant='body2' sx={{ fontSize: 14, color: '#3b3737ff' }}>
              {subjectName}
            </Typography>
          </Box>
          {['firstCa', 'secondCa', 'exam'].map((field, index) => (
            <Box key={field} sx={{ borderRight: index < 2 ? '1px solid #eee' : 'none' }}>
              <TextField
                name={field}
                value={scores[field as keyof ScoreFields]}
                onChange={handleInputChange}
                size='small'
                fullWidth
                slotProps={{
                  input: {
                    inputMode: 'numeric',
                    style: { textAlign: 'center' },
                  },
                }}
                sx={sharedInputStyles}
              />
            </Box>
          ))}
        </Box>

        {/* Remark Row */}
        <Box
          display='grid'
          alignItems='center'
          bgcolor='#f7f7f7'
          mt={0}
          border='1px solid #eee'
          borderTop='none'
          borderRadius='0 0 4px 4px'
          sx={{
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 240px',
            },
          }}
        >
          <Box px={1}>
            <Typography variant='body2' sx={{ fontWeight: 500 }}></Typography>
          </Box>
          <TextField
            name='remark'
            placeholder='Remark'
            value={scores.remark}
            onChange={handleInputChange}
            size='small'
            fullWidth
            sx={{
              ...sharedInputStyles,
              '& .MuiInputBase-input': {
                textAlign: 'left',
              },
            }}
          />
        </Box>

        {/* Submit */}
        <Box mt={2} display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={isPending}
            sx={{
              bgcolor: 'rgb(19, 172, 221)',
              boxShadow: 0,
              textTransform: 'capitalize',
            }}
            endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
