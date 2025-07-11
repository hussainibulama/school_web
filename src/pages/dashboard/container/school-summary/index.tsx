import {
  StudentSummaryCard,
  ParentSummaryCard,
  TeacherSummaryCard,
  TermProgress,
} from '../../components';
import { Box } from '@mui/material';

export default function SchoolSummary() {
  return (
    <Box>
      {/** Term progress Summary*/}
      <TermProgress />

      {/** School Summary*/}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: '1 1 300px', // grow, shrink, basis
            minWidth: 280,
          }}
        >
          <StudentSummaryCard />
        </Box>
        <Box
          sx={{
            flex: '1 1 300px',
            minWidth: 280,
          }}
        >
          <ParentSummaryCard />
        </Box>
        <Box
          sx={{
            flex: '1 1 300px',
            minWidth: 280,
          }}
        >
          <TeacherSummaryCard />
        </Box>
      </Box>

      {/** End of school Summary*/}
    </Box>
  );
}
