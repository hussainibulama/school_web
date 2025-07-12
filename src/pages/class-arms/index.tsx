import React from 'react';
import { Box, Button } from '@mui/material';
import { BreadcrumbHeader } from '../../container';
import { getColumns } from './constants';
import { CustomDataGrid } from '../../components';
import { useActionsManager, useGetClassArms } from '../../hooks';
import { CreateUpdateArm, DeleteArm, TemplateModal } from './components';

type ModalType = 'delete' | 'edit' | 'template';
type ActionType = {
  type: ModalType;
  classArmId?: string;
  classArmName?: string;
};
export default function ClassArms() {
  const { data: classArms, isLoading } = useGetClassArms();
  const classArmsList = classArms?.data || [];
  const rows = classArmsList.map((entry: any, index: number) => ({ id: index + 1, ...entry }));

  const {
    anchorEl,
    menuRowId,
    openModal,
    actionType,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType,
    closeModal,
  } = useActionsManager<ActionType>();

  const columns = getColumns({
    anchorEl,
    menuRowId,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType: (type: ModalType, classArmId?: string, classArmName?: string) => {
      handleOpenModalWithType(type, { classArmId, classArmName });
    },
  });

  return (
    <Box>
      <BreadcrumbHeader title={`Class Arms`} />

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
        {/* Empty Incase input */}
        <Box></Box>

        {/* Status input and button grouped */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: { xs: 1, sm: 0 },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleOpenModalWithType('template')}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: '100%',
              backgroundColor: 'rgb(220 189 116)',
              color: 'black',
            }}
          >
            Use Template
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleOpenModalWithType('edit')}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: '100%',
              backgroundColor: '#3e6614',
            }}
          >
            Create Arm
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}

      <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={rows} columns={columns} loading={isLoading} />
      </Box>

      <TemplateModal open={openModal && actionType.type === 'template'} onClose={closeModal} />
      <DeleteArm
        open={openModal && actionType.type === 'delete'}
        classArmId={actionType.classArmId || ''}
        closeModal={closeModal}
      />
      <CreateUpdateArm
        open={openModal && actionType.type === 'edit'}
        classArmId={actionType.classArmId}
        classArmName={actionType.classArmName}
        onClose={closeModal}
      />
    </Box>
  );
}
