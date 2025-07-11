import { Box } from '@mui/material';
import { HoverShadowWrapper } from '../../../../components';
import { ParentKidIcon } from '../../../../assets';
export default function Parent() {
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
          background: 'rgb(248, 254, 252)',
          border: '1px solid rgb(44, 218, 157)',
          color: 'rgb(44, 218, 157)',
          borderRadius: 2,
          width: '100%',
          height: '100%',
        }}
      >
        <ParentKidIcon width={'60px'} height={'60px'} />
      </Box>
    </HoverShadowWrapper>
  );
}
