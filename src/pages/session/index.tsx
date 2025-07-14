import { useState } from 'react';
import { BreadcrumbHeader } from '../../container';
import { Box, Button } from '@mui/material';
import { SessionTable, UpdateSession, CreateSession } from './components';

export default function Session() {
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [tempTermId, setTempTermId] = useState<string>('');

  const handleUpdate = (academicTerm: string) => {
    setTempTermId(academicTerm);
    setOpenUpdate(true);
  };
  const onClose = () => {
    setOpenUpdate(false);
    setOpenCreate(false);
    setTempTermId('');
  };
  return (
    <>
      <Box py={4}>
        <BreadcrumbHeader title={`Session & Terms`} />
      </Box>
      <Box my={3}>
        <Box
          mb={2}
          py={2}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
          }}
        >
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenCreate(true)}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: 'auto',
              backgroundColor: '#3e6614',
            }}
          >
            Create Session
          </Button>
        </Box>
        <SessionTable handleUpdate={handleUpdate} />
      </Box>

      <UpdateSession open={openUpdate} academicYear={tempTermId} onClose={onClose} />
      <CreateSession open={openCreate} onClose={onClose} />
    </>
  );
}
