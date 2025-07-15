import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useActionsManager, useGetSchoolClass } from '../../hooks';
import { CustomDataGrid, FormField } from '../../components';
import { getColumns } from './constants';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadcrumbHeader } from '../../container';

type ModalType = 'view';

type ActionType = {
  type: ModalType;
  subjectId?: string;
};

export default function ViewAssessmentSubjects() {
  const { schoolClassId } = useParams();

  const { data: schoolClass, isLoading } = useGetSchoolClass();

  const classRoom = useMemo(() => {
    const classList = schoolClass?.data || [];
    return classList?.find((entry: any) => entry.schoolClassId === schoolClassId) || {};
  }, [schoolClass, schoolClassId]);

  const rows = (classRoom?.subjects || []).map((entry: any, index: number) => ({
    id: index + 1,
    ...entry,
  }));

  const [nameFilter, setNameFilter] = useState('');

  const navigate = useNavigate();

  const { anchorEl, menuRowId, handleMenuOpen, handleMenuClose, handleOpenModalWithType } =
    useActionsManager<ActionType>();

  const columns = getColumns({
    anchorEl,
    menuRowId,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType: (type: ModalType, subjectId?: string) => {
      if (type === 'view') {
        navigate(`${subjectId}`);
        return;
      }
      handleOpenModalWithType(type, { subjectId });
    },
  });

  const filteredRows = rows.filter((row: any) => {
    const matchesName = row.subject_name?.toLowerCase?.().includes(nameFilter?.toLowerCase?.());
    return matchesName;
  });

  return (
    <Box width='100%'>
      {/* Header */}
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <BreadcrumbHeader title={`Select subject`} />
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
              label='Search by subject name'
              value={nameFilter}
              handleChange={(e: any) => setNameFilter(e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      {/* Data Grid */}
      <Typography variant='body2' fontWeight='bold' mb={3}>
        Select the subject for which you want to record an assessment
      </Typography>
      <Box sx={{ minHeight: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={filteredRows} columns={columns} loading={isLoading} />
      </Box>
    </Box>
  );
}
