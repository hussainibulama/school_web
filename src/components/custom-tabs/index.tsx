import React, { useState } from 'react';
import { Box, Tabs, Tab, Divider } from '@mui/material';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  initialIndex?: number;
  fullWidth?: boolean;
}

export default function CustomTabs({ tabs, initialIndex = 0, fullWidth = false }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(initialIndex);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant={fullWidth ? 'fullWidth' : 'scrollable'}
        scrollButtons={fullWidth ? false : 'auto'}
        textColor='primary'
        indicatorColor='primary'
        sx={{
          minHeight: 0,
          margin: 0,
          padding: 0,
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label + index}
            label={tab.label}
            disableRipple
            sx={{
              textTransform: 'capitalize',
              minHeight: 0,
              minWidth: 'auto',
              padding: '8px 8px', // smaller padding to bring it closer
              fontWeight: 500,
              color: 'black',
              bgcolor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent',
                color: 'black',
              },
            }}
          />
        ))}
      </Tabs>

      <Divider sx={{ margin: 0 }} />

      <Box sx={{ mt: 2 }}>{tabs[activeTab]?.content}</Box>
    </Box>
  );
}
