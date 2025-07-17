import { Box } from '@mui/material';
import { CustomTabs } from '../../components';
import { useMemo } from 'react';
import { SchoolSummary, AttendanceSummary } from './container';

const Dashboard = () => {
  const tabs = useMemo(
    () => [
      { label: 'School Summary', content: <SchoolSummary /> },
      { label: 'Attendance Report', content: <AttendanceSummary /> },
    ],
    [],
  );
  return (
    <Box my={3}>
      <CustomTabs initialIndex={0} tabs={tabs} />
    </Box>
  );
};

export default Dashboard;
