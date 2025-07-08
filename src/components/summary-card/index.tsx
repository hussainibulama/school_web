import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Grid } from '@mui/material';

// Reusable SummaryCard Component
const SummaryCard = ({
  title,
  value,
  items,
}: {
  title: string;
  value?: number;
  items: { label: string; value?: number }[];
}) => (
  <Grid container spacing={1} sx={{ flexGrow: 1 }}>
    <Card
      sx={{
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 0.1,
        flexGrow: 1,
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        {value !== undefined && (
          <>
            <Typography variant='h4' fontWeight='bold' color='text.primary'>
              {value}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' sx={{ mb: 2 }}>
              {title}
            </Typography>
          </>
        )}

        <Stack direction='row' spacing={4} justifyContent='center'>
          {items.map((item) => (
            <Box key={item.label} textAlign='center'>
              <Typography variant='h6' fontWeight='medium'>
                {item.value}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  </Grid>
);
export default SummaryCard;
