import { Box } from '@mui/material';
import { BreadcrumbHeader } from '../../container';

export default function ViewBroadSheet() {
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <BreadcrumbHeader title='View Broadsheet' />
      </Box>
    </Box>
  );
}
