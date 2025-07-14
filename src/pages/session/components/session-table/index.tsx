import { Box, Button, Typography } from '@mui/material';
import { CustomDataGrid } from '../../../../components';
import { useGetSchoolSessions } from '../../../../hooks';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { formatDate } from '../../../../util';

export default function SessionTable({ handleUpdate }: { handleUpdate?: (id: string) => void }) {
  const { data: session, isLoading } = useGetSchoolSessions();

  const rows = session?.data?.map((entry: any, index: number) => ({
    ...entry,
    id: index + 1,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 50 },
    {
      field: 'academicYear',
      headerName: 'Academic Session',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'firstTermStart',
      headerName: 'First Term',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.5,
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant='body2'>Starts: {formatDate(params.row.firstTermStart)}</Typography>
          <Typography variant='body2'>
            Ends&nbsp;&nbsp;: {formatDate(params.row.firstTermEnd)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'secondTermStart',
      headerName: 'Second Term',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.5,
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant='body2'>Starts: {formatDate(params.row.secondTermStart)}</Typography>
          <Typography variant='body2'>
            Ends&nbsp;&nbsp;: {formatDate(params.row.secondTermEnd)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'thirdTermStart',
      headerName: 'Third Term',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.5,
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant='body2'>Starts: {formatDate(params.row.thirdTermStart)}</Typography>
          <Typography variant='body2'>
            Ends&nbsp;&nbsp;: {formatDate(params.row.thirdTermEnd)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'currentTerm',
      headerName: 'Current Term',
      flex: 1,
      minWidth: 80,
    },
    {
      field: 'isCurrent',
      headerName: 'Current Session',
      flex: 1,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => <>{params.value === true ? 'Yes' : 'No'}</>,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleUpdate?.(params.row.academicYear)}
            sx={{
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              width: 'auto',
              backgroundColor: 'rgb(220 189 116)',
              color: 'black',
            }}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Box sx={{ minHeight: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={rows} columns={columns} loading={isLoading} />
      </Box>
    </Box>
  );
}
