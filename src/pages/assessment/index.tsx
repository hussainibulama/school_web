import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useActionsManager, useGetSchoolClass, useGetClassArms } from '../../hooks';
import { CustomDataGrid, FormField, FormSelect } from '../../components';
import { capitalize } from '../../util';
import { getColumns } from './constants';
import { useNavigate } from 'react-router-dom';

type ModalType = 'view';

type ActionType = {
  type: ModalType;
  schoolClassId?: string;
};

export default function Assessment() {
  const { data: schoolClass, isLoading } = useGetSchoolClass();

  const { data: classArms } = useGetClassArms();

  const options =
    classArms?.data?.map((entry: any) => ({
      label: capitalize(entry.classArmName),
      value: entry.classArmName,
    })) || [];

  const classList = schoolClass?.data || [];
  const rows = classList.map((entry: any, index: number) => ({ id: index + 1, ...entry }));

  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const navigate = useNavigate();

  const { anchorEl, menuRowId, handleMenuOpen, handleMenuClose, handleOpenModalWithType } =
    useActionsManager<ActionType>();

  const columns = getColumns({
    anchorEl,
    menuRowId,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType: (type: ModalType, schoolClassId?: string) => {
      if (type === 'view') {
        navigate(`${schoolClassId}`);
        return;
      }
      handleOpenModalWithType(type, { schoolClassId });
    },
  });

  const filteredRows = rows.filter((row: any) => {
    const matchesName = row.label?.toLowerCase?.().includes(nameFilter?.toLowerCase?.());

    const matchesStatus = statusFilter
      ? row.label?.toLowerCase?.().endsWith(statusFilter.toLowerCase())
      : true;

    return matchesName && matchesStatus;
  });

  return (
    <Box width='100%'>
      {/* Header */}
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h6' fontWeight='bold'>
          Assessment
        </Typography>
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
              label='Search by Class Name'
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
              label='Arms'
              value={statusFilter}
              options={[{ label: 'All', value: '' }, ...options]}
              handleChange={(e: any) => setStatusFilter(e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      {/* Data Grid */}
      <Typography variant='body2' fontWeight='bold' mb={3}>
        Select the class for which you want to record an assessment
      </Typography>
      <Box sx={{ minHeight: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={filteredRows} columns={columns} loading={isLoading} />
      </Box>
    </Box>
  );
}
