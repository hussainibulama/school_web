import { useMemo, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

import {
  CreateStudent,
  UpdateStudent,
  GenderProgress,
  StatusProgress,
  Student as StudentIconComponent,
  AssignClass,
  AssignParent,
} from './components';

import { useActionsManager, useStudentList } from '../../hooks';
import { CustomDataGrid, FormField, FormSelect } from '../../components';
import { ActivateUserModal } from '../../container';
import { mapUserTableData, handleExport } from '../../util';
import { getColumns } from './constants';
import { useNavigate } from 'react-router-dom';

type ModalType = 'view' | 'edit' | 'confirm' | 'assign-parent' | 'assign-class' | undefined;
type ActionType = {
  type: ModalType;
  userId?: string;
  active?: boolean;
};

const Student = () => {
  const { data: student, isLoading } = useStudentList();
  const studentList = student?.data || [];

  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const navigate = useNavigate();

  const {
    anchorEl,
    menuRowId,
    openModal,
    actionType,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType,
    closeModal,
    setOpenModal,
  } = useActionsManager<ActionType>();

  const columns = getColumns({
    anchorEl,
    menuRowId,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType: (type: ModalType, userId?: string, active?: boolean) => {
      if (type === 'view') {
        navigate(`${userId}`);
        return;
      }
      handleOpenModalWithType(type, { userId, active });
    },
  });

  const summaryCards = useMemo(
    () => [<StudentIconComponent />, <GenderProgress />, <StatusProgress />],
    [],
  );

  // Map and filter staff data
  const mappedData = mapUserTableData(studentList);

  const filteredRows = mappedData.filter((row) => {
    const matchesName = row.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesStatus = statusFilter ? row.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  return (
    <Box width='100%'>
      {/* Header */}
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h6' fontWeight='bold'>
          Student
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Box mb={3}>
        <Stack direction='row' spacing={2} flexWrap='wrap' useFlexGap>
          {summaryCards.map((Card, index) => (
            <Box key={index} sx={{ minWidth: index > 0 ? 410 : 'auto', flexGrow: 1 }}>
              {Card}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Filters + Create Button */}

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
        {/* Name input */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexGrow: { xs: 1, sm: 0 },
            gap: 2,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 100,
            }}
          >
            <FormField
              name='nameFilter'
              label='Search by Name'
              value={nameFilter}
              handleChange={(e: any) => setNameFilter(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              minWidth: 100,
            }}
          >
            <FormSelect
              name='statusFilter'
              label='Status'
              value={statusFilter}
              options={[
                { label: 'All', value: '' },
                { label: 'Active', value: 'Active' },
                { label: 'Deactivated', value: 'Deactivated' },
              ]}
              handleChange={(e: any) => setStatusFilter(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 100,
            }}
          >
            <FormSelect
              name='export'
              label='Export'
              value=''
              options={[
                { label: 'Export to Excel', value: 'excel' },
                { label: 'Export to PDF', value: 'pdf' },
              ]}
              handleChange={(e) => handleExport(filteredRows, e.target.value)}
              sx={{
                flexGrow: { xs: 1, sm: 0 },
                minWidth: 120,
              }}
            />
          </Box>
        </Box>

        {/* Status input and button grouped */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 0 },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenModal(true)}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: '100%',
              backgroundColor: '#3e6614',
            }}
          >
            Create Student
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}

      <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={filteredRows} columns={columns} loading={isLoading} />
      </Box>

      {/* Modals */}
      <CreateStudent open={openModal && actionType.type === undefined} onClose={closeModal} />
      <AssignClass
        open={openModal && actionType.type === 'assign-class'}
        onClose={closeModal}
        userId={actionType.userId}
      />
      <AssignParent
        open={openModal && actionType.type === 'assign-parent'}
        onClose={closeModal}
        userId={actionType.userId}
      />
      <UpdateStudent
        open={openModal && actionType.type === 'edit'}
        userId={actionType.userId}
        onClose={closeModal}
      />
      <ActivateUserModal
        userId={actionType.userId}
        open={openModal && actionType.type === 'confirm'}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default Student;
