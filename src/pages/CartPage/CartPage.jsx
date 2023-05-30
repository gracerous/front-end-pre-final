import React from 'react';
import CartTable from '../../components/CartTable/CartTable';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NothingToShow() {

  const navigate = useNavigate();
  const handleBtnBackClick = () => {
    navigate('/main-page');
  }

  return (
    <Box
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 600,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant='h2'>
        Your Cart is Empty :(
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 5 }}>
        Looks like you haven'added anything to your cart yet
      </Typography>
      <Button variant='contained' onClick={handleBtnBackClick}>Continue shopping!</Button>
    </Box>
  )
}
export default function CartPage() {
  const productsInCart = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  const handlePaymentClick = () => {
    navigate('/checkout');
  }
  return (
    productsInCart.length > 0 ? (
      <Box>
        <CartTable />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button variant='contained' onClick={handlePaymentClick}>Proceed to payment</Button>
        </Box>
      </Box>
    ) : (<NothingToShow />)
  )
}
