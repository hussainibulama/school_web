import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CreateStaff, UpdateStaff, ViewStaff } from './components';
import { UpdateUserByIdPayload, useStaffList, useUpdateUserById } from '../../hooks/useUserHook';
import SummaryCard from '../../components/summary-card';
import { ConfirmationModal } from '../../components';
import { useSnackbar } from '../../hoc/snack-bar';

type ActionType = {
  type: 'view' | 'edit' | 'confirm' | undefined;
  userId: string | undefined;
  active?: boolean;
};
const Staff = () => {
  const { showSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = React.useState<number | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = React.useState<ActionType>({
    type: undefined,
    userId: undefined,
  });
  const { mutate: updateUser, isPending: isSubmitting } = useUpdateUserById();
  const { data: staff, isLoading } = useStaffList();

  const staffList = staff?.data;

  const stats = staffList?.reduce(
    (acc: any, user: any) => {
      // Gender count
      if (user.gender === 'm') acc.male++;
      if (user.gender === 'f') acc.female++;

      // Role count
      if (user.role === 'teacher') acc.teacher++;
      if (user.role === 'admin') acc.admin++;
      if (user.role === 'proprietor') acc.proprietor++;
      if (user.active === true) acc.active++;
      if (user.active === false) acc.deactivated++;

      return acc;
    },
    {
      total: staffList.length,
      male: 0,
      female: 0,
      teacher: 0,
      admin: 0,
      proprietor: 0,
      active: 0,
      deactivated: 0,
    },
  );
  const summaryData = [
    {
      title: 'Total Staffs',
      value: stats?.total,
      breakdown: [
        { label: 'Female', value: stats?.female },
        { label: 'Male', value: stats?.male },
      ],
    },
    {
      title: 'Proprietor',
      value: stats?.proprietor,
      breakdown: [
        { label: 'Academic', value: stats?.teacher },
        { label: 'Non-Academic', value: stats?.admin },
      ],
    },
    {
      title: '',
      breakdown: [
        { label: 'Active', value: stats?.active },
        { label: 'Deactivated', value: stats?.deactivated },
      ],
    },
  ];
  const tableData = staffList?.map((item: any, index: number) => ({
    id: index + 1,
    userId: item?.userId,
    name: [item?.firstName, item?.middleName, item?.lastName].filter(Boolean).join(' '),
    gender: item?.gender,
    type: item?.role,
    phone: item?.phone,
    email: item?.email,
    created: item?.createdAt,
    active: item?.active,
    status: item?.active === true ? 'Active' : 'Deactivated',
  }));

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };
  const handleEditProfile = (userId: string) => {
    setOpenModal(true);
    setActionType({ type: 'edit', userId });
    handleMenuClose();
  };
  const handleViewProfile = (userId: string) => {
    setOpenModal(true);
    setActionType({ type: 'view', userId });
    handleMenuClose();
  };
  const handleResetAction = () => {
    setActionType({ type: undefined, userId: undefined });
  };
  const handleDeactivate = (userId: string, active: boolean) => {
    setOpenModal(true);
    setActionType({ type: 'confirm', userId, active });
    handleMenuClose();
  };
  const deactivateUser = () => {
    updateUser(
      {
        userId: actionType?.userId || '',
        active: !actionType?.active,
      } as UpdateUserByIdPayload,
      {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || 'User Deactivated', 'success');
          setOpenModal(false);
          handleResetAction();
        },
        onError: (err) => {
          showSnackbar(err?.response?.data?.message || 'Unable to deactivate user', 'error');
        },
      },
    );
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'gender', headerName: 'Gender', flex: 1, minWidth: 80 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 90 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
    { field: 'created', headerName: 'Date Created', flex: 1, minWidth: 150 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'error'}
          size='small'
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={menuRowId === params.row.id} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleViewProfile(params?.row?.userId)}>View</MenuItem>
            <MenuItem onClick={() => handleEditProfile(params?.row?.userId)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeactivate(params?.row?.userId, params?.row?.active)}>
              {params?.row?.active ? 'Deactivate' : 'Activate'}
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];
  return (
    <Box width='100%'>
      {isLoading && (
        <Box
          position='absolute'
          top={0}
          left={0}
          width='100%'
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          zIndex={10}
          bgcolor='rgba(255,255,255,0.6)'
        >
          <CircularProgress />
        </Box>
      )}
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2} width='100%'>
        <Typography variant='h6' fontWeight='bold'>
          Staff List
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpenModal(true)}
          sx={{ textTransform: 'capitalize' }}
        >
          Create Staff
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box mb={3}>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {summaryData.map((item, index) => (
            <SummaryCard
              key={index}
              title={item?.title}
              value={item?.value}
              items={item?.breakdown}
            />
          ))}
        </Grid>
      </Box>

      {/* Data Grid */}
      <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
        <DataGrid rows={tableData} columns={columns} disableRowSelectionOnClick />
      </Box>
      <CreateStaff
        open={openModal && actionType.type === undefined}
        onClose={() => {
          setOpenModal(false);
          handleResetAction();
        }}
      />
      <UpdateStaff
        open={openModal && actionType.type === 'edit'}
        userId={actionType.userId}
        onClose={() => {
          setOpenModal(false);
          handleResetAction();
        }}
      />
      <ViewStaff
        open={openModal && actionType.type === 'view'}
        userId={actionType.userId}
        onClose={() => {
          setOpenModal(false);
          handleResetAction();
        }}
      />
      <ConfirmationModal
        open={openModal && actionType.type === 'confirm'}
        onClose={() => {
          setOpenModal(false);
          handleResetAction();
        }}
        onConfirm={deactivateUser}
        isSubmitting={isSubmitting}
        error={actionType?.active || false}
        title={`${actionType?.active ? 'Deactivate' : 'Activate'}  User`}
        message={`Are you sure you want to ${actionType?.active ? 'deactivate' : 'activate'} this user?`}
        confirmText={actionType?.active ? 'Deactivate' : 'Activate'}
      />
    </Box>
  );
};

export default Staff;
