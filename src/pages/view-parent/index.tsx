import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUserById, useGetParentLinksById } from '../../hooks';
import { ViewProfile, BreadcrumbHeader } from '../../container';
import { Avatar, Box, Typography } from '@mui/material';
import { UpdateStudent } from '../student/components';
import PersonIcon from '@mui/icons-material/Person';

export default function ViewParent() {
  const { id: userId } = useParams();

  const { data: user, isLoading } = useFetchUserById(userId);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const { data: parentLinks } = useGetParentLinksById(userId);

  return (
    <>
      <Box py={4}>
        <BreadcrumbHeader
          title={`${user?.data?.firstName || ''} ${user?.data?.middleName || ''} ${user?.data?.lastName || ''}`}
        />
      </Box>

      <ViewProfile
        isLoading={isLoading}
        onEdit={() => setOpenUpdate(true)}
        values={user?.data || {}}
      />
      <Box my={3}>
        <Typography variant='subtitle1' fontWeight={600} mb={2}>
          Childrens Linked
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
          }}
        >
          {parentLinks?.data?.map((entry: any, idx: any) => {
            const student = entry?.student || {};
            const fullName = [student.firstName, student.middleName, student.lastName]
              .filter(Boolean)
              .join(' ');

            return (
              <Box
                key={idx}
                sx={{
                  p: 3,
                  width: {
                    xs: '100%', // full width on mobile
                    sm: 250,
                    md: 280,
                    lg: 300,
                  },
                  borderRadius: 2,
                  boxShadow: 1,
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                  <PersonIcon />
                </Avatar>

                <Box display='flex' flexDirection='column' gap={0.5}>
                  <Typography variant='h6'>{fullName}</Typography>
                  <Typography variant='body2' color='text.secondary' textTransform='capitalize'>
                    Gender: {student.gender}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <UpdateStudent open={openUpdate} userId={userId} onClose={() => setOpenUpdate(false)} />
    </>
  );
}
