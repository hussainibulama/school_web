import { Box } from '@mui/material';
import { CustomTabs } from '../../components';
import { useMemo } from 'react';
import { SchoolSummary } from './container';

const Dashboard = () => {
  const tabs = useMemo(() => [{ label: 'School Summary', content: <SchoolSummary /> }], []);
  return (
    <Box my={3}>
      <CustomTabs initialIndex={0} tabs={tabs} />
    </Box>
  );
};

export default Dashboard;
