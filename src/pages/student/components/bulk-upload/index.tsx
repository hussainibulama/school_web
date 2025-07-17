import { CloudUpload } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { FormSelect, Modal } from '../../../../components';
import { useAssignClass, useCreateUsers, useGetSchoolClass } from '../../../../hooks';
import { useSnackbar } from '../../../../hoc';
import { generateStudentTemplate } from './util';

const BulkUpload = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { data: classList, isLoading } = useGetSchoolClass();
  const { mutate: createUser, isPending } = useCreateUsers();
  const { mutate: assignClass, isPending: _isPending } = useAssignClass();

  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [parsedData, setParsedData] = useState<any[]>([]);
  const { showSnackbar } = useSnackbar();

  // camelCase converter function
  function toCamelCase(str: string) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Skip first row (title), use second row as header
      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
        range: 1,
        defval: '',
      });

      const normalized = jsonData.map((row) => {
        const normalizedRow: Record<string, any> = {};

        Object.entries(row).forEach(([key, value]) => {
          const camelKey = toCamelCase(key);

          // Replace dateOfBirth with dob
          if (camelKey === 'dateOfBirth') {
            normalizedRow['dob'] = value;
          } else {
            normalizedRow[camelKey] = value;
          }
        });

        // Generate email using firstName + timestamp
        const timestamp = Date.now();
        const firstName = (normalizedRow.firstName || '').toLowerCase().replace(/\s+/g, '');
        normalizedRow.email = `${firstName}.${timestamp}@gmail.com`;

        // Add fixed password
        normalizedRow.password = '123456';
        normalizedRow.role = 'student';

        return normalizedRow;
      });
      setParsedData(normalized);
      console.log('Parsed & Normalized Data:', normalized);
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  });

  const handleClose = () => {
    setFileName(null);
    setParsedData([]);
    setSelectedClass('');
    onClose();
  };
  const rows: any[] =
    classList?.data.map((entry: any) => ({
      value: entry.schoolClassId,
      label: entry.label,
    })) || [];

  const handleSubmit = () => {
    if (!parsedData.length) {
      showSnackbar('Please upload a valid Excel file.', 'error');
      return;
    }
    if (!selectedClass) {
      showSnackbar('Please select a class.', 'error');
      return;
    }

    createUser(parsedData as any, {
      onSuccess: (res: any) => {
        const studentIds = res.data?.map((entry: any) => entry?.userId);
        showSnackbar(res?.message || 'Users created, assigning class in progress', 'success');
        assignClass(
          { schoolClassId: selectedClass, studentIds: studentIds },
          {
            onSuccess: (res: any) => {
              showSnackbar(res?.message || 'Class assigned successfully', 'success');
              handleClose();
            },
            onError: (err: any) => {
              showSnackbar(
                err?.response?.data?.message || 'Unable to assign class try later',
                'error',
              );
            },
          },
        );
      },
      onError: (err) => {
        showSnackbar(err?.response?.data?.message || 'Unable to create users', 'error');
      },
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      isSubmitting={isPending || _isPending}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      title='Bulk Upload Students'
      submitText='Upload'
      dividers={false}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #aaa',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant='body1'>
          {fileName
            ? `Uploaded File: ${fileName}`
            : isDragActive
              ? 'Drop the file here...'
              : 'Drag & drop or click to upload'}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          Only .xlsx files are supported
        </Typography>
      </Box>

      <Box my={3}>
        <FormSelect
          name='schoolClassId'
          label='Select Class'
          options={rows}
          value={selectedClass}
          handleChange={(e) => setSelectedClass(e.target.value)}
        />
      </Box>

      <Box mt={3}>
        <Typography variant='body2'>
          Download the sample file format for bulk uploading students:{' '}
          <Link component='button' onClick={generateStudentTemplate} underline='hover'>
            Download sample.xlsx
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default BulkUpload;
