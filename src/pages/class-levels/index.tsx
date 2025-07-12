import { Box, Button } from '@mui/material';
import { BreadcrumbHeader } from '../../container';
import { getColumns } from './constants';
import { CustomDataGrid } from '../../components';
import { useActionsManager, useGetSchoolClass } from '../../hooks';
import { CreateClassLevels } from './components';

type ModalType = 'create';
type ActionType = {
  type: ModalType;
  schoolClassId?: string;
};
export default function ClassLevels() {
  const { data: classArms, isLoading } = useGetSchoolClass();
  const schoolClassList = classArms?.data || [];
  const rows = schoolClassList.map((entry: any, index: number) => ({ id: index + 1, ...entry }));

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
    handleOpenModalWithType: (type: ModalType, schoolClassId?: string) => {
      handleOpenModalWithType(type, { schoolClassId });
    },
  });

  return (
    <Box>
      <BreadcrumbHeader title={`Class Levels`} />

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
            onClick={() => handleOpenModalWithType('create')}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: '100%',
              backgroundColor: '#3e6614',
            }}
          >
            Create Level
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}

      <Box sx={{ minHeight: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={rows} columns={columns} loading={isLoading} />
      </Box>

      <CreateClassLevels open={openModal && actionType.type === 'create'} onClose={closeModal} />
    </Box>
  );
}
