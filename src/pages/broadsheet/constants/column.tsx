import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import React from 'react';

type IGetColumns = {
  handleOpenModalWithType: (type: 'view', schoolClassId?: string) => void;
};

export const getColumns = ({ handleOpenModalWithType }: IGetColumns): GridColDef[] => {
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
  ];
};
