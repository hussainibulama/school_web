import { ReactNode } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

type SideNavItemProps = {
  label: string;
  icon: ReactNode;
  path: string;
};

function SideNavItem({ label, icon, path }: SideNavItemProps) {
  const theme = useTheme();

  return (
    <ListItem disablePadding>
      <NavLink
        to={path}
        end={path === ''}
        style={{
          textDecoration: 'none',
          width: '100%',
        }}
      >
        {({ isActive }) => (
          <ListItemButton
            sx={{
              height: '45px',
              color: isActive ? theme.palette.primary.main : 'rgb(32, 33, 36)',
              borderLeft: `2px solid ${isActive ? theme.palette.primary.main : 'transparent'}`,
              p: 0,
              m: 0,
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                color: isActive ? theme.palette.primary.main : 'rgb(32, 33, 36)',
                justifyContent: 'center',
                width: '70px',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              slotProps={{
                primary: {
                  sx: {
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '15px',
                    fontWeight: isActive ? 'bold' : 'normal',
                  },
                },
              }}
            />
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  );
}

export default SideNavItem;
