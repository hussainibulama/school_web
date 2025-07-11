import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUserById } from '../../hooks';
import { ViewProfile, BreadcrumbHeader } from '../../container';
import { Box } from '@mui/material';
import { UpdateStaff } from '../staff/components';
import { CustomTabs } from '../../components';

export default function ViewStaff() {
  const { id: userId } = useParams();

  const { data: user, isLoading } = useFetchUserById(userId);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  return (
    <>
      <Box py={4}>
        <BreadcrumbHeader
          title={`${user?.data?.firstName} ${user?.data?.middleName} ${user?.data?.lastName}`}
        />
      </Box>

      <ViewProfile
        isLoading={isLoading}
        onEdit={() => setOpenUpdate(true)}
        values={user?.data || {}}
      />
      <Box my={3}>
        <CustomTabs initialIndex={0} tabs={[{ label: 'Class', content: <></> }]} />
      </Box>

      <UpdateStaff open={openUpdate} userId={userId} onClose={() => setOpenUpdate(false)} />
    </>
  );
}
