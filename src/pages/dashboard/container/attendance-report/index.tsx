import { useMemo, useState } from 'react';
import { Box, Typography, TextField, useTheme } from '@mui/material';
import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetAttendance, useGetSchoolClass } from '../../../../hooks';
import { CustomDataGrid, Loader } from '../../../../components';
import './chartSetup';

type AttendanceSummaryItem = {
  label: string;
  late: number;
  absent: number;
  excused: number;
};

const AttendanceSummary = () => {
  const theme = useTheme();
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const { data: schoolClasses, isLoading: loadingClasses } = useGetSchoolClass();
  const { data: attendanceData, isLoading: loadingAttendance } = useGetAttendance({
    date: startDate,
    endDate,
  });

  const summary: AttendanceSummaryItem[] = useMemo(() => {
    if (!schoolClasses?.data) return [];

    const result: Record<string, AttendanceSummaryItem> = {};

    schoolClasses.data.forEach((cls: any) => {
      result[cls.schoolClassId] = {
        label: cls.label || '',
        late: 0,
        absent: 0,
        excused: 0,
      };
    });

    if (attendanceData?.data) {
      attendanceData.data.forEach((record: any) => {
        const classId = record.schoolClassId;
        const status = record.status;
        if (!result[classId]) return;

        if (status === 'late') result[classId].late++;
        else if (status === 'absent') result[classId].absent++;
        else if (status === 'excused') result[classId].excused++;
      });
    }

    return Object.values(result);
  }, [attendanceData, schoolClasses]);

  const chartData = {
    labels: summary.map((s) => s.label.charAt(0).toUpperCase() + s.label.slice(1)),
    datasets: [
      {
        label: 'Late',
        backgroundColor: '#FFA726',
        data: summary.map((s) => s.late),
        barThickness: 8,
        stack: 'stack1',
      },
      {
        label: 'Absent',
        backgroundColor: '#EF5350',
        data: summary.map((s) => s.absent),
        barThickness: 8,
        stack: 'stack1',
      },
      {
        label: 'Excused',
        backgroundColor: '#42A5F5',
        data: summary.map((s) => s.excused),
        barThickness: 8,
        stack: 'stack1',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: theme.typography.fontFamily,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.dataset.label || '';
            return `${label.charAt(0).toUpperCase() + label.slice(1)}: ${ctx.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 11,
            family: theme.typography.fontFamily,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
            family: theme.typography.fontFamily,
          },
        },
      },
    },
  };

  const studentRows = useMemo(() => {
    if (!attendanceData?.data) return [];

    return attendanceData.data
      .filter((record: any) => ['late', 'absent', 'excused'].includes(record.status))
      .map((record: any, index: number) => ({
        id: index + 1,
        fullName:
          `${record.student?.firstName || ''} ${record.student?.middleName || ''} ${record.student?.lastName || ''}`.trim(),
        email: record.student?.email || '',
        status: record.status.charAt(0).toUpperCase() + record.status.slice(1),
        class:
          schoolClasses?.data.find((c: any) => c.schoolClassId === record.schoolClassId)?.label ||
          '',
      }));
  }, [attendanceData, schoolClasses]);

  const columns = [
    { field: 'fullName', headerName: 'Student Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'class',
      headerName: 'Class',
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant='body2' component='span' textTransform='capitalize'>
          {params.value}
        </Typography>
      ),
    },
  ];

  const isLoading = loadingClasses || loadingAttendance;

  return (
    <Box>
      <Box display='flex' gap={2} mb={2} flexWrap='wrap'>
        <TextField
          type='date'
          label='From'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          size='small'
          sx={{ fontFamily: theme.typography.fontFamily }}
          slotProps={{
            inputLabel: {
              sx: { fontSize: '0.8rem' },
            },
            input: {
              sx: { fontSize: '0.8rem' },
            },
          }}
        />
        <TextField
          type='date'
          label='To'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          size='small'
          sx={{ fontFamily: theme.typography.fontFamily }}
          slotProps={{
            inputLabel: {
              sx: { fontSize: '0.8rem' },
            },
            input: {
              sx: { fontSize: '0.8rem' },
            },
          }}
        />
      </Box>

      {isLoading && <Loader />}
      <Box width='100%' height={400}>
        <Bar data={chartData} options={chartOptions} />
      </Box>
      {studentRows.length > 0 && (
        <>
          <Typography my={2} variant='subtitle1' fontWeight='bold'>
            Absent, Late & Excused Students
          </Typography>
          <Box width='100%' minHeight={400}>
            <CustomDataGrid rows={studentRows} columns={columns} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AttendanceSummary;
