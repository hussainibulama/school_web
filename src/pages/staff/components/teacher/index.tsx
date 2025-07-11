import { Box } from '@mui/material';
import { HoverShadowWrapper } from '../../../../components';
import { TeacherIcon } from '../../../../assets';
export default function Teacher() {
  return (
    <HoverShadowWrapper
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          background: 'rgb(255, 251, 249)',
          border: '1px solid rgb(239, 126, 35)',
          color: 'rgb(239, 126, 35)',
          borderRadius: 2,
          width: '100%',
          height: '100%',
        }}
      >
        <TeacherIcon width={'60px'} />
      </Box>
    </HoverShadowWrapper>
  );
}
