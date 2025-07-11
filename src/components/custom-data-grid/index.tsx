import React from 'react';
import {
  Box,
  Pagination,
  PaginationItem,
  Select,
  MenuItem as MuiMenuItem,
  useTheme,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  GridPaginationModel,
  DataGridProps,
} from '@mui/x-data-grid';

const pageSizeOptions = [1, 10, 20, 30, 50, 100];

function CustomFooter({
  pageSize,
  onPageSizeChange,
}: {
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const theme = useTheme();

  return (
    <Box
      display='flex'
      width='100%'
      justifyContent='space-between'
      alignItems='center'
      px={2}
      py={1}
    >
      <Box display='flex' alignItems='center' gap={1}>
        <Select
          size='small'
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          sx={{ fontFamily: theme.typography.fontFamily, fontSize: 13 }}
        >
          {pageSizeOptions.map((size) => (
            <MuiMenuItem
              key={size}
              value={size}
              sx={{ fontFamily: theme.typography.fontFamily, fontSize: 13 }}
            >
              {size} Rows
            </MuiMenuItem>
          ))}
        </Select>
      </Box>

      <Pagination
        color='primary'
        variant='outlined'
        shape='rounded'
        page={page + 1}
        count={pageCount}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
        renderItem={(item) => <PaginationItem {...item} component='div' />}
      />
    </Box>
  );
}

interface ICustomDataGridProps extends Omit<DataGridProps, 'rows' | 'columns'> {
  rows: any[];
  columns: GridColDef[];
}

export default function CustomDataGrid({ rows, columns, ...rest }: ICustomDataGridProps) {
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: pageSizeOptions[1],
  });
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      slots={{
        pagination: () => (
          <CustomFooter
            pageSize={paginationModel.pageSize}
            onPageSizeChange={(newSize) =>
              setPaginationModel((prev) => ({
                ...prev,
                pageSize: newSize,
                page: 0,
              }))
            }
          />
        ),
      }}
      sx={{
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
          fontFamily: (theme) => theme.typography.fontFamily,
        },
        '& .MuiMenuItem-root': {
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 13,
        },
        '& .MuiDataGrid-menu': {
          fontFamily: (theme) => theme.typography.fontFamily,
        },
        '& .MuiList-root': {
          fontFamily: (theme) => theme.typography.fontFamily,
        },
      }}
      {...rest}
    />
  );
}
