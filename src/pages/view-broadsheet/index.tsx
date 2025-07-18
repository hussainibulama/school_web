import { Box, Typography, Button, Divider, useTheme, CircularProgress } from '@mui/material';
import { BreadcrumbHeader } from '../../container';
import { useParams } from 'react-router';
import {
  useGenerateResult,
  useGetAcademicYears,
  useGetSchoolClass,
  useGetSchoolInfo,
  useGetSchoolSessions,
  useGetStudentResultById,
} from '../../hooks';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FormSelect, Loader } from '../../components';
import { useSnackbar } from '../../hoc';
import { printElement } from '../../util';

export default function ViewBroadSheet() {
  const theme = useTheme();
  const { schoolClassId } = useParams();
  const { showSnackbar } = useSnackbar();
  const [academicYear, setAcademicYear] = useState('');
  const [academicTerm, setAcademicTerm] = useState(1);

  const { data: school, isLoading } = useGetSchoolInfo();
  const { data: schoolClasses, isLoading: _isLoading } = useGetSchoolClass();
  const { data: session } = useGetSchoolSessions();
  const { data: academicYears, isLoading: __isLoading } = useGetAcademicYears();
  const { data: results, isLoading: ___isLoading } = useGetStudentResultById({
    schoolClassId,
    academicYear,
    academicTerm,
  });
  const { mutate: generateResult, isPending } = useGenerateResult();
  const handleGenerateResult = () => {
    generateResult(
      { schoolClassId, academicYear, academicTerm: String(academicTerm) },
      {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || 'Result Generated', 'success');
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || 'Unable to generate result, try later',
            'error',
          );
        },
      },
    );
  };
  const classLevel = schoolClasses?.data.find((item: any) => item?.schoolClassId === schoolClassId);

  const academicYearOptions =
    academicYears?.data.map((entry: any) => ({
      value: entry.yearLabel,
      label: entry.yearLabel,
    })) || [];

  useEffect(() => {
    const currentSession = session?.data?.find((entry: any) => entry.isCurrent);
    setAcademicYear(currentSession?.academicYear || '');
    setAcademicTerm(currentSession?.currentTerm || 1);
  }, [academicYears]);

  const printRef = useRef<HTMLDivElement>(null);

  const { rows, subjects } = useMemo(() => {
    if (!results?.data?.length) return { rows: [], subjects: [] };

    const raw = results.data;

    // Unique subjects
    const subjects = Array.from(new Set(raw.map((item: any) => item.subject.subjectName)));

    const studentMap = new Map<string, any>();
    const totalScoresMap = new Map<string, number>();
    const originalPositions = new Map<string, number | null>();

    raw.forEach((item: any) => {
      const studentId = item.student.userId;
      const subjectName = item.subject.subjectName;

      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, {
          id: studentId,
          name: `${item.student?.firstName || ''} ${item.student?.middleName || ''} ${item.student?.lastName || ''}`,
        });
      }

      const studentData = studentMap.get(studentId);
      studentData[subjectName] = `${item.totalScore} (${item.grade})`;

      // Sum totalScores for fallback position calculation
      totalScoresMap.set(studentId, (totalScoresMap.get(studentId) || 0) + item.totalScore);

      // Save original position if exists, null otherwise
      if (!originalPositions.has(studentId)) {
        originalPositions.set(studentId, item.position ?? null);
      }
    });

    // Convert map to array for sorting and position assignment
    const studentArray = Array.from(studentMap.values());

    studentArray.forEach((student) => {
      student.totalScore = totalScoresMap.get(student.id) || 0;
    });

    // Sort descending by totalScore for ordering
    studentArray.sort((a, b) => b.totalScore - a.totalScore);

    // Assign position from original data if available, else computed rank
    studentArray.forEach((student, index) => {
      const originalPos = originalPositions.get(student.id);
      student.position = originalPos;
    });

    return { rows: studentArray, subjects };
  }, [results]);

  const handlePrint = () => printElement(printRef.current);
  // Inline styles for print-friendly table
  const thStyle: React.CSSProperties = {
    border: '1px solid rgb(224 224 224)',
    padding: '8px',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.775rem',
    textTransform: 'capitalize',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid rgb(224 224 224)',
    padding: '8px',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.775rem',
    textTransform: 'capitalize',
  };

  return (
    <Box position='relative'>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <BreadcrumbHeader title='View Broadsheet' />
      </Box>
      <Box
        mb={2}
        py={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          borderTop: '1px solid #ddd',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 0 },
            width: { xs: '100%', sm: 'auto' },
            gap: 2,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 100,
            }}
          >
            <FormSelect
              name='academicYear'
              label='Select Session'
              value={academicYear}
              options={academicYearOptions}
              handleChange={(e) => setAcademicYear(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ '& .MuiSelect-select': { fontSize: '0.8rem' } }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 100,
            }}
          >
            <FormSelect
              name='academicTerm'
              label='Select Term'
              value={String(academicTerm)}
              options={[
                { value: 1, label: 'First Term' },
                { value: 2, label: 'Second Term' },
                { value: 3, label: 'Third Term' },
              ]}
              handleChange={(e) => setAcademicTerm(Number(e.target.value))}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ '& .MuiSelect-select': { fontSize: '0.8rem' } }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 0 },
            width: { xs: '100%', sm: 'auto' },
            gap: 2,
          }}
        >
          <Button
            variant='outlined'
            onClick={handlePrint}
            sx={{
              textTransform: 'capitalize',
              width: 'auto',
            }}
          >
            Print
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleGenerateResult}
            disabled={isPending}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: 'auto',
              backgroundColor: '#3e6614',
              boxShadow: 0,
            }}
            endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
          >
            Generate Position
          </Button>
        </Box>
      </Box>
      {isLoading || _isLoading || __isLoading || (___isLoading && <Loader />)}

      <Box ref={printRef} sx={{ p: 2 }}>
        <Box textAlign='center' mb={2}>
          <Typography
            variant='body2'
            sx={{
              fontSize: 32,
              fontWeight: 700,
              textTransform: 'capitalize',
            }}
          >
            {school?.data?.schoolName || ''}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {school?.data?.schoolAddress || ''}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {classLevel?.label || ''}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />
        {rows.length > 0 ? (
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box
              component='table'
              sx={{
                width: '100%',
                minWidth: 600, // ensures the table doesn't collapse too narrowly
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Position</th>
                  {subjects.map((subject: any) => (
                    <th key={subject} style={thStyle}>
                      {subject}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((student: any) => (
                  <tr key={student.id}>
                    <td style={tdStyle}>{student.name}</td>
                    <td style={tdStyle}>{student.position ?? '-'}</td>
                    {subjects.map((subject: any) => (
                      <td key={subject} style={tdStyle}>
                        {student[subject] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Box>
          </Box>
        ) : (
          <Typography variant='body2' textAlign='center' my={10}>
            No Rows
          </Typography>
        )}
      </Box>
    </Box>
  );
}
