import React, { useState } from 'react';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import PaymentStepper from '../../components/PaymentStepper/PaymentStepper';
import { setOrderDetails } from '../../redux/actions/ordersActions';
import { emptyCart } from '../../redux/actions/cartActions';
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Overview = ({ goToPrevStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(state => state.cart.products);
  const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo'));
  const cardInfo = JSON.parse(localStorage.getItem('paymentInfo'));
  const valueElements = [];

  for (let key in deliveryInfo) {
    valueElements.push(
      <Typography key={key} variant='body1'>
        {deliveryInfo[key]}
      </Typography>
    );
  }

  const handleSubmitOrder = () => {
    const orderDetails = {
      date: Date.now(),
      products: [...cartProducts],
      deliveryInfo,
      cardInfo
    }
    dispatch(emptyCart());
    dispatch(setOrderDetails(orderDetails));
    navigate('/main-page');
  }

  return (
    <Box>
      <TableContainer sx={{ mb: '15px' }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map((product) => (
              <TableRow
                key={product.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={product.thumbnail} alt="" height={'50px'} />
                </TableCell>
                <TableCell align="left">{product.title}</TableCell>
                <TableCell align="left">{product.quantity}</TableCell>
                <TableCell align="right">{(product.price / 100 * (100 - product.discountPercentage)).toFixed(2)} USD</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper sx={{ minWidth: '50%', padding: '1em', mb: '10px' }} variant="outlined">
        {valueElements}
        Card Number: {cardInfo.cardNumber}
      </Paper>
      <Button variant="contained" onClick={handleSubmitOrder} sx={{ mr: '10px' }}>Submit order</Button>
      <Button variant="outlined" color="error" onClick={goToPrevStep}>Back</Button>
    </Box>
  );
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  const goToNextStep = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep)
  }

  const goToPrevStep = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep)
  }
  return (
    <Box component={Paper} elevation={4} padding={5}>
      <Box sx={{ minHeight: '400px' }}>
        {activeStep === 0 ? (<DeliveryForm goToNextStep={goToNextStep} />) :
          activeStep === 1 ? <PaymentForm goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} /> :
            <Overview goToPrevStep={goToPrevStep} />}
      </Box>
      <PaymentStepper activeStep={activeStep} />
    </Box>
  )
}
