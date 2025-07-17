import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

type IGetColumns = {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => void;
  handleMenuClose: () => void;
  handleOpenModalWithType: (type: 'view', schoolClassId?: string) => void;
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
      maxWidth: 70,
      disableColumnMenu: true,
    },
    {
      field: 'label',
      headerName: 'Level Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            onClick={() => handleOpenModalWithType('view', params.row.schoolClassId)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.5,
              justifyContent: 'center',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant='body2'
              textTransform='capitalize'
              sx={{
                color: 'rgba(15, 168, 114, 1)',
                textDecoration: 'underline',
                fontWeight: 900,
              }}
            >
              {params.value}
            </Typography>
            <Typography variant='body2' textTransform='capitalize'>
              {params.row.classId}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'teacherClasses',
      headerName: 'Form Teacher',
      flex: 1,
      minWidth: 80,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box component='span' textTransform='capitalize'>
            {`${params?.value[0]?.teacher?.first_name || ''} ${params?.value[0]?.teacher?.middle_name || ''} ${params?.value[0]?.teacher?.last_name || ''}`}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      maxWidth: 80,
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
            <Menu
              anchorEl={anchorEl}
              open={menuRowId === row.id}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  sx: (theme) => ({
                    fontFamily: theme.typography.fontFamily,
                    m: 0,
                    '& .MuiMenuItem-root': {
                      fontSize: '14px',
                    },
                  }),
                },
              }}
            >
              <MenuItem onClick={() => handleOpenModalWithType('view', row.schoolClassId)}>
                View
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
};
