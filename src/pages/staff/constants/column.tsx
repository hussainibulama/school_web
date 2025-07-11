import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

type IGetColumns = {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => void;
  handleMenuClose: () => void;
  handleOpenModalWithType: (
    type: 'view' | 'edit' | 'confirm',
    userId?: string,
    active?: boolean,
  ) => void;
};

export const getColumns = ({
  anchorEl,
  menuRowId,
  handleMenuOpen,
  handleMenuClose,
  handleOpenModalWithType,
}: IGetColumns): GridColDef[] => {
  return [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'gender', headerName: 'Gender', flex: 1, minWidth: 80, disableColumnMenu: true },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      minWidth: 90,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'created',
      headerName: 'Date Created',
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ value }) => (
        <Chip label={value} color={value === 'Active' ? 'success' : 'error'} size='small' />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <>
            <IconButton onClick={(e) => handleMenuOpen(e, row.id)}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={menuRowId === row.id} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleOpenModalWithType('view', row.userId)}>View</MenuItem>
              <MenuItem onClick={() => handleOpenModalWithType('edit', row.userId)}>Edit</MenuItem>
              <MenuItem onClick={() => handleOpenModalWithType('confirm', row.userId, row.active)}>
                {row.active ? 'Deactivate' : 'Activate'}
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
};
