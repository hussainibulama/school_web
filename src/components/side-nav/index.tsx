import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Paid as PaidIcon,
  Class as ClassIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  MenuBook as LessonPlanIcon,
  Message as MessageIcon,
  Description as BroadsheetIcon,
  Quiz as CbtIcon,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu'; // Mobile menu icon
import { NavLink } from 'react-router-dom';
import { LogoVireo } from '../../container';
const menuItems = [
  { label: 'Dashboard', path: '', icon: <DashboardIcon /> },
  { label: 'Staff', path: 'staff', icon: <GroupIcon /> },
  { label: 'Student', path: 'student', icon: <SchoolIcon /> },
  { label: 'Parent', path: 'parent', icon: <PeopleIcon /> },
  { label: 'Fees', path: 'fees', icon: <PaidIcon /> },
  { label: 'Classes', path: 'classes', icon: <ClassIcon /> },
  { label: 'Broadsheet', path: 'broadsheet', icon: <BroadsheetIcon /> },
  { label: 'CBT', path: 'cbt', icon: <CbtIcon /> },
  { label: 'Lesson Plan', path: 'lesson-plan', icon: <LessonPlanIcon /> },
  { label: 'Messaging', path: 'messaging', icon: <MessageIcon /> },
  { label: 'Time Table', path: 'time-table', icon: <ScheduleIcon /> },
  { label: 'Assessment', path: 'assessment', icon: <AssessmentIcon /> },
];

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Automatically detect mobile screens

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile Drawer Button */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1200, // Ensure the button stays above other content
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
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'} // Temporary for mobile, permanent for desktop
        anchor='left'
      >
        {/* Drawer Content */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <LogoVireo />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <NavLink
                to={item.path}
                end={item.path === ''}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#1976d2' : 'rgb(32, 33, 36)',
                  width: '100%',
                })}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      height: '40px',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      color: isActive ? '#1976d2' : 'rgb(32, 33, 36)',
                      '& .MuiListItemText-primary': {
                        ontFamily: theme.typography.fontFamily,
                        fontSize: '0.9rem',
                      },
                      '& .MuiListItemIcon-root': {
                        color: isActive ? '#1976d2' : 'rgb(32, 33, 36)',
                        minWidth: '30px',
                        marginRight: '8px',
                        '& svg': {
                          fontSize: '1rem',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideNav;
