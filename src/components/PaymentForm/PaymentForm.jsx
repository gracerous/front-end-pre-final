import React, { useState } from 'react';
import { Stack, Alert, Button, FormControl, TextField, Box } from '@mui/material';

export default function PaymentForm({ goToPrevStep, goToNextStep }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { cardNumber, expiryDate, cvv } = formData;
    const cardNumberRegex = /^(\d{4}[-\s]?){3}\d{4}$/;
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    const cvvRegex = /^\d{3}$/;

    const newErrors = {
      cardNumber: !cardNumberRegex.test(cardNumber) ? 'Invalid card number' : false,
      expiryDate: !cardExpiryRegex.test(expiryDate) ? 'Invalid expiry date' : false,
      cvv: !cvvRegex.test(cvv) ? 'invalid CVV' : false
    };

    if (Object.values(newErrors).every((error) => !error)) {
      localStorage.setItem('paymentInfo', JSON.stringify(formData));
      setErrors({
        cardNumber: false,
        expiryDate: false,
        cvv: false
      });
      goToNextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
    >
      {(errors.cardNumber ||
        errors.expiryDate ||
        errors.cvv) && (
          <Alert severity='error'>Please fill all required* inputs</Alert>
        )}
      <FormControl>
        <TextField
          label='Card number'
          required
          placeholder='XXXX - XXXX - XXXX - XXXX'
          name='cardNumber'
          value={formData.cardNumber}
          onChange={handleInputChange}
          error={errors.cardNumber}
          helperText={errors.cardNumber}
        />
        <Stack direction='row'>
          <TextField
            label='Year of Expiry'
            required
            placeholder='MM / DD'
            fullWidth
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            error={errors.expiryDate}
            helperText={errors.expiryDate}
          />
          <TextField
            label='CVV'
            required
            fullWidth
            placeholder='XXX'
            name='cvv'
            value={formData.cvv}
            onChange={handleInputChange}
            error={errors.cvv}
            helperText={errors.cvv}
          />
        </Stack>
        <Stack direction='row' spacing={1} sx={{ mt: 2 }} justifyContent={'center'}>
          <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='outlined' color='error' onClick={goToPrevStep}>
            Back
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
