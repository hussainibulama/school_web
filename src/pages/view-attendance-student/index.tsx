import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from '@mui/material';

import { useCreateAttendance, useGetAttendance, useGetClassStudentById } from '../../hooks';
import { FormField, CheckBox, Loader } from '../../components';
import { useParams } from 'react-router-dom';
import { BreadcrumbHeader } from '../../container';
import { useSnackbar } from '../../hoc';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export default function ViewAttendanceStudents() {
  const { showSnackbar } = useSnackbar();

  const { schoolClassId } = useParams();

  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const { data: studentData, isLoading } = useGetClassStudentById(schoolClassId);
  const { data: attendance, isLoading: _isLoading } = useGetAttendance({
    schoolClassId,
    date: attendanceDate,
  });

  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({});

  const studentsList = useMemo(() => {
    return studentData?.data?.map((entry: any) => ({
      name: [entry?.student?.firstName, entry?.student?.middleName, entry?.student?.lastName]
        .map((name) => name?.trim())
        .filter(Boolean)
        .join(' '),
      userId: entry?.student?.userId,
      avatarUrl: entry?.student?.avatarUrl,
    }));
  }, [studentData]);

  // Map attendance from backend into a dictionary
  useEffect(() => {
    if (!studentsList) return;
    const existingRecords = attendance?.data || [];
    const attendanceMap: Record<string, AttendanceStatus> = {};

    for (const record of existingRecords) {
      attendanceMap[record.studentId] = record.status;
    }

    const initialRecords = studentsList?.reduce(
      (acc: Record<string, AttendanceStatus>, student: any) => {
        acc[student.userId] = attendanceMap[student.userId] || 'present';
        return acc;
      },
      {},
    );

    setAttendanceRecords(initialRecords);
  }, [attendance, studentsList]);

  const handleAttendanceChange = (userId: string, status: AttendanceStatus) => {
    setAttendanceRecords((prev: any) => ({
      ...prev,
      [userId]: prev[userId] === status ? undefined : status,
    }));
  };

  const { mutate: createAttendance, isPending } = useCreateAttendance();
  const handleSaveAttendance = () => {
    const recordsArray = Object.entries(attendanceRecords).map(([studentId, status]) => ({
      studentId,
      status,
    }));
    const payloads = {
      schoolClassId: schoolClassId || '',
      date: new Date(attendanceDate).toISOString().split('T')[0],
      records: recordsArray,
    };
    createAttendance(payloads, {
      onSuccess: () => {
        showSnackbar('Attendance registered Successfully', 'success');
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.message || 'Unable to register attendance at the moment',
          'error',
        );
      },
    });
  };

  return (
    <Box width='100%'>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <BreadcrumbHeader title='Students Attendance' />
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
          alignItems: 'center',
        }}
      >
        <Box>
          <FormField
            type='date'
            name='attendanceDate'
            label='Attendance Date'
            value={attendanceDate}
            handleChange={(e: any) => setAttendanceDate(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant='contained'
            onClick={handleSaveAttendance}
            disabled={isPending}
            sx={{
              background: '#3e6614',
              textTransform: 'capitalize',
              boxShadow: 0,
            }}
            endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Typography variant='body2' fontWeight='bold' mb={3}>
        Choose a date for attendance. Today is selected by default.
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Student</TableCell>
            {['Present', 'Absent', 'Late', 'Excused'].map((label) => (
              <TableCell key={label} align='center' sx={{ fontWeight: 'bold' }}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(isLoading || _isLoading) && <Loader />}
          {studentsList?.map((student: any) => (
            <TableRow key={student.userId}>
              <TableCell>
                <Box display='flex' alignItems='center' gap={1}>
                  <Avatar
                    src={student.avatarUrl}
                    alt={student.name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant='body2'>{student.name}</Typography>
                </Box>
              </TableCell>
              {(['present', 'absent', 'late', 'excused'] as AttendanceStatus[]).map((status) => (
                <TableCell key={status} align='center' sx={{ py: 1.5 }}>
                  <CheckBox
                    label=''
                    checked={attendanceRecords[student.userId] === status}
                    onChange={() => handleAttendanceChange(student.userId, status)}
                    sx={{ padding: 0 }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
