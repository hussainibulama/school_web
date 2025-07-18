import { useParams } from 'react-router-dom';
import { useGetSchoolClass } from '../../hooks';
import { BreadcrumbHeader } from '../../container';
import { Box } from '@mui/material';
import { CustomTabs, ClassBanner } from '../../components';
import { FormTeacherCard, MembersList, ClassSubjects } from './components';

export default function ViewClasses() {
  const { id: schoolClassId } = useParams();

  const { data: classes, isLoading } = useGetSchoolClass();
  const classRoom =
    classes?.data?.find((entry: any) => entry.schoolClassId === schoolClassId) || {};

  return (
    <>
      <Box py={4}>
        <BreadcrumbHeader title={`View Classes`} />
      </Box>
      <ClassBanner label={classRoom?.label || ''} isLoading={isLoading} />
      <Box my={3}>
        <CustomTabs
          initialIndex={0}
          tabs={[
            { label: 'Class Members', content: <MembersList schoolClassId={schoolClassId} /> },
            { label: 'Subjects', content: <ClassSubjects schoolClassId={schoolClassId} /> },
            {
              label: 'Form Teacher',
              content: <FormTeacherCard schoolClassId={schoolClassId || ''} />,
            },
          ]}
        />
      </Box>
    </>
  );
}
