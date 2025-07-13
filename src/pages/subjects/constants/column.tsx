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
      minWidth: 50,
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
      minWidth: 80,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box component='span' textTransform='capitalize'>
            {params.value}
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
      field: 'subjects',
      headerName: 'Subjects',
      flex: 1,
      minWidth: 200,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            component='div'
            textTransform='capitalize'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'visible', // allow overflow
              whiteSpace: 'normal', // allow wrapping
              wordBreak: 'break-word', // allow breaks
              lineHeight: 1.5,
              gap: 0.5,
              height: '100%', // key
              width: '100%',
            }}
          >
            {params?.value?.map((entry: any, idx: number) => (
              <Typography variant='body2'>
                {idx + 1}. {entry?.subject_name}
              </Typography>
            ))}
          </Box>
        );
      },
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
                Add or Edit Subjects
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
};
