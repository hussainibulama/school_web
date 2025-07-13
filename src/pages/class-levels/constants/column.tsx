import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Chip } from '@mui/material';

type IGetColumns = {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => void;
  handleMenuClose: () => void;
  handleOpenModalWithType: (type: 'create', schoolClassId?: string) => void;
};

export const getColumns = ({
  anchorEl,
  menuRowId,
  handleMenuOpen,
  handleMenuClose,
  handleOpenModalWithType,
}: IGetColumns): GridColDef[] => {
  return [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
    },
    {
      field: 'label',
      headerName: 'Level Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box component='span' textTransform='capitalize'>
            {params.value}
          </Box>
        );
      },
    },
    {
      field: 'classId',
      headerName: 'Level Short Name',
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box component='span' textTransform='capitalize'>
            {params.value?.toLowerCase?.() || ''}
          </Box>
        );
      },
    },
    {
      field: 'createdAt',
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
      renderCell: () => <Chip label={'Active'} color='success' size='small' />,
    },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   flex: 1,
    //   minWidth: 80,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params: GridRenderCellParams) => {
    //     const { row } = params;
    //     return (
    //       <>
    //         <IconButton onClick={(e) => handleMenuOpen(e, row.id)}>
    //           <MoreVertIcon />
    //         </IconButton>
    //         <Menu
    //           anchorEl={anchorEl}
    //           open={menuRowId === row.id}
    //           onClose={handleMenuClose}
    //           slotProps={{
    //             paper: {
    //               sx: (theme) => ({
    //                 fontFamily: theme.typography.fontFamily,
    //                 m: 0,
    //                 '& .MuiMenuItem-root': {
    //                   fontSize: '14px',
    //                 },
    //               }),
    //             },
    //           }}
    //         >
    //           <MenuItem onClick={() => handleOpenModalWithType('create', row.schoolClassId)}>
    //             Edit
    //           </MenuItem>
    //           <MenuItem
    //             onClick={() => handleOpenModalWithType('create', row.schoolClassId)}
    //             sx={(theme) => ({
    //               color: theme.palette.error.main,
    //             })}
    //           >
    //             Delete
    //           </MenuItem>
    //         </Menu>
    //       </>
    //     );
    //   },
    // },
  ];
};
