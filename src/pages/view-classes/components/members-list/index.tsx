import { useState } from 'react';
import { Box } from '@mui/material';
import { CustomDataGrid, FormField } from '../../../../components';
import { useGetClassStudentById } from '../../../../hooks';

export default function MembersList({ schoolClassId }: { schoolClassId?: string }) {
  const { data: student, isLoading } = useGetClassStudentById(schoolClassId);
  const studentList = student?.data || [];

  const [nameFilter, setNameFilter] = useState('');

  const rows = studentList.map((entry: any, index: number) => ({ ...entry, id: index + 1 }));

  const filteredRows = rows.filter((row: any) => {
    const fullName = `${row.student?.firstName || ''} ${row.student?.middleName || ''} ${row.student?.lastName || ''}`;
    const matchesName = fullName?.toLowerCase?.().includes(nameFilter?.toLowerCase?.());
    return matchesName;
  });
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 150 },
    {
      field: 'student',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => (
        <>
          {params.value?.firstName} {params.value?.middleName || ''} {params.value?.lastName}
        </>
      ),
    },
  ];
  return (
    <Box>
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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexGrow: { xs: 1, sm: 0 },
            gap: 2,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 100,
            }}
          >
            <FormField
              name='nameFilter'
              label='Search by Name'
              value={nameFilter}
              handleChange={(e: any) => setNameFilter(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ minHeight: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={filteredRows} columns={columns} loading={isLoading} />
      </Box>
    </Box>
  );
}
