import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CardSkeleton() {
  return (
    <Box sx={{ marginRight: 0.5, my: 5 }}>
      <Skeleton variant="rectangular" height={200} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
}