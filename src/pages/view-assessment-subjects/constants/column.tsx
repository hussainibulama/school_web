import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

type IGetColumns = {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => void;
  handleMenuClose: () => void;
  handleOpenModalWithType: (type: 'view', subjectId?: string) => void;
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
      field: 'subject_name',
      headerName: 'Subject Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            onClick={() => handleOpenModalWithType('view', params.row.subject_id)}
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
                color: '#1976d2',
                textDecoration: 'underline',
                fontWeight: 900,
              }}
            >
              {params.value}
            </Typography>
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
              <MenuItem onClick={() => handleOpenModalWithType('view', row.subject_id)}>
                View
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
};
