import { useParams } from 'react-router-dom';
import { useAddClassSubjects, useGetGeneralSubjects, useGetSchoolClass } from '../../hooks';
import { BreadcrumbHeader } from '../../container';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { CheckBox, ClassBanner, Loader } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from '../../hoc';

export default function ClassSubjects() {
  const { id: schoolClassId } = useParams();

  const { data: classes, isLoading } = useGetSchoolClass();
  const { data: subjects, isLoading: _isLoading } = useGetGeneralSubjects();
  const subjectsLists = subjects?.data || [];

  const classRoom = useMemo(
    () => classes?.data?.find((entry: any) => entry.schoolClassId === schoolClassId) || {},
    [classes, schoolClassId],
  );

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (classRoom?.subjects?.length) {
      const preselectedIds = classRoom.subjects.map((sub: any) => sub.subject_id);
      setSelectedSubjects(preselectedIds);
    }
  }, [classRoom]);

  const handleToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    );
  };
  const { showSnackbar } = useSnackbar();

  const { mutate: createSubjects, isPending } = useAddClassSubjects();

  const handleSave = async () => {
    createSubjects(
      { schoolClassId: schoolClassId || '', subjectIds: selectedSubjects },
      {
        onSuccess: () => {
          showSnackbar('Subjects Added Successfully', 'success');
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || 'Unable to add subjects at the moment',
            'error',
          );
        },
      },
    );
  };

  const selected = subjectsLists.filter((s: any) => selectedSubjects.includes(s.subjectId));
  const unselected = subjectsLists.filter((s: any) => !selectedSubjects.includes(s.subjectId));

  const renderSubjects = (list: any[]) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 1.5,
      }}
    >
      {list.map((entry: any) => (
        <CheckBox
          key={entry.subjectId}
          value={entry.subjectId}
          label={entry.subjectName}
          checked={selectedSubjects.includes(entry.subjectId)}
          onChange={() => handleToggle(entry.subjectId)}
        />
      ))}
    </Box>
  );

  return (
    <>
      <Box py={4}>
        <BreadcrumbHeader title={`Add or Edit Class Subjects`} />
      </Box>
      <Box width={{ xs: '100%', sm: '70%' }}>
        <ClassBanner label={classRoom?.label || ''} isLoading={isLoading}>
          <Typography variant='subtitle1' color='rgba(255, 255, 255, 0.7)' fontWeight={600}>
            Subjects
          </Typography>
        </ClassBanner>
      </Box>

      <Box my={3} width={{ xs: '100%', sm: '70%' }}>
        <Typography variant='subtitle1' fontWeight={600} mb={2} textTransform='capitalize'>
          Selected subjects
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: '#f3f3f6',
            borderRadius: 2,
          }}
        >
          {selected.length > 0 ? (
            renderSubjects(selected)
          ) : (
            <Typography variant='body2' color='text.secondary'>
              No subjects selected yet.
            </Typography>
          )}
        </Paper>

        <Box display='flex' justifyContent='flex-end' mt={2} mb={4}>
          {selected.length > 0 && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
              disabled={isPending}
              endIcon={isPending ? <CircularProgress size={20} color='inherit' /> : null}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 700,
              }}
            >
              Save
            </Button>
          )}
        </Box>

        <Typography variant='subtitle1' fontWeight={600} mb={2}>
          Available Subjects
        </Typography>

        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            p: 2,
            backgroundColor: '#f3f3f6',
            borderRadius: 2,
          }}
        >
          {_isLoading && <Loader />}
          {renderSubjects(unselected)}
        </Paper>
      </Box>
    </>
  );
}
