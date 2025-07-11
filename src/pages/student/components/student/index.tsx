import { Box } from '@mui/material';
import { HoverShadowWrapper } from '../../../../components';
import { StudentIcon } from '../../../../assets';

export default function Student() {
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
          background: 'rgb(254, 247, 249)',
          border: '1px solid rgb(216, 30, 91)',
          color: 'rgb(216, 30, 91)',
          borderRadius: 2,
          width: '100%',
          height: '100%',
        }}
      >
        <StudentIcon width={'60px'} height={'60px'} />
      </Box>
    </HoverShadowWrapper>
  );
}
