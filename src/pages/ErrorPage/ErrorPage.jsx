import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate('/main-page');
  }
  return (
    <Box>
      <h1>We lost this page</h1>
      <p>We searched high and low but couldn't find what you are looking for. Lets find a better place for you to go.</p>
      <Button variant='contained' onClick={handleBtnClick}>Check our best offers!</Button>
    </Box>
  )
}
