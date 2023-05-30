import * as React from 'react';
import { styled, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CartBadge() {
  const cartItems = useSelector((state) => state.cart.products);
  return (
    <IconButton aria-label='cart'>
      <StyledBadge badgeContent={cartItems.length} color='primary'>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}