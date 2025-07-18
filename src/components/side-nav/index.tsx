import { useState } from 'react';
import { Drawer, List, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Mobile menu icon
import { LogoVireo } from '../../container';
import {
  DashboardIcon,
  SettingsIcon,
  AssessmentIcon,
  ClassIcon,
  StudentIcon,
  ParentIcon,
  StaffIcon,
  AttendanceIcon,
  BroadsheetIcon,
} from '../../assets';
import { useGeneralContext } from '../../hoc';
import { SideNavItem } from './component';

const iconStyle = {
  height: '20px',
  width: '20px',
};
const menuItems = [
  {
    label: 'Dashboard',
    path: '',
    icon: <DashboardIcon {...iconStyle} />,
  },
  { label: 'Staff', path: 'staff', icon: <StaffIcon {...iconStyle} /> },
  { label: 'Student', path: 'student', icon: <StudentIcon {...iconStyle} /> },
  { label: 'Parent', path: 'parent', icon: <ParentIcon {...iconStyle} /> },
  { label: 'Classes', path: 'classes', icon: <ClassIcon {...iconStyle} /> },
  { label: 'Attendace', path: 'attendance', icon: <AttendanceIcon {...iconStyle} /> },
  { label: 'Broadsheet', path: 'broadsheet', icon: <BroadsheetIcon {...iconStyle} /> },
  { label: 'Assessment', path: 'assessment', icon: <AssessmentIcon {...iconStyle} /> },
];

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { showIconsOnly } = useGeneralContext();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile Drawer Button */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            zIndex: 10,
            height: 56,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Drawer */}
      <Drawer
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: !showIconsOnly ? 200 : 71,
          transition: 'width 0.3s ease-in-out',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: !showIconsOnly ? 200 : 71,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor='left'
      >
        {/* Main Section: Logo + Menu Items */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
              p: 2,
            }}
          >
            <LogoVireo logoSize={40} gap={2} nameSize={30} />
          </Box>
          <List>
            {menuItems.map((item) => (
              <SideNavItem key={item.label} label={item.label} path={item.path} icon={item.icon} />
            ))}
          </List>
        </Box>

        {/* Footer: Settings Link */}
        <Box>
          <List>
            <SideNavItem
              label={'Settings'}
              path={'settings'}
              icon={<SettingsIcon {...iconStyle} />}
            />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideNav;
