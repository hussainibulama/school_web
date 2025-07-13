import { Box } from '@mui/material';
import { CustomDataGrid } from '../../../../components';
import { useGetSchoolClass } from '../../../../hooks';

export default function ClassSubjects({ schoolClassId }: { schoolClassId?: string }) {
  const { data: classes, isLoading } = useGetSchoolClass();
  const classRoom =
    classes?.data?.find((entry: any) => entry.schoolClassId === schoolClassId) || {};

  const rows = classRoom?.subjects?.map((entry: any, index: number) => ({
    ...entry,
    id: index + 1,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 150 },
    {
      field: 'subject_name',
      headerName: 'Subject',
      flex: 1,
      minWidth: 150,
    },
  ];
  console.log(classes, classRoom, classRoom?.subjects, 'hahah');
  return (
    <Box>
      <Box sx={{ minHeight: 400, width: '100%', overflowX: 'auto' }}>
        <CustomDataGrid rows={rows} columns={columns} loading={isLoading} />
      </Box>
    </Box>
  );
}
