import React, { useState } from 'react';
import { Stack, Alert, Button, FormControl, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DeliveryForm({ goToNextStep }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    deliveryAdd: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    city: false,
    deliveryAdd: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetInputs = () => {
    setFormData({
      name: '',
      phone: '',
      city: '',
      deliveryAdd: '',
    });
    setErrors({
      name: false,
      phone: false,
      city: false,
      deliveryAdd: false,
    });
  };

  const handleSubmit = () => {
    const { name, phone, city, deliveryAdd } = formData;

    const phoneRegex = /^\+?\d{1,3}\s?\d{9}$/;
    const cityRegex = /^[a-zA-Z\s]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    const newErrors = {
      name: !nameRegex.test(name) ? 'Please enter a valid name' : false,
      phone: !phoneRegex.test(phone) ? 'Please enter a valid phone number: at least 10 digits' : false,
      city: !cityRegex.test(city) ? 'Please enter a valid city name' : false,
      deliveryAdd: !deliveryAdd ? 'Please enter a delivery address' : false,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      localStorage.setItem('deliveryInfo', JSON.stringify(formData));
      setErrors({
        name: false,
        phone: false,
        city: false,
        deliveryAdd: false,
      });
      goToNextStep();
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    resetInputs();
    navigate('/cart');
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      {(errors.name ||
        errors.phone ||
        errors.city ||
        errors.deliveryAdd) && (
          <Alert severity='error'>Please fill all required* inputs</Alert>
        )}
      <FormControl sx={{ maxWidth: '100%' }}>
        <TextField
          label='Name'
          required
          fullWidth
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          helperText={errors.name}
        />
        <TextField
          label='Telephone'
          required
          fullWidth
          name='phone'
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label='City'
          required
          fullWidth
          name='city'
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
          helperText={errors.city}
        />
        <TextField
          label='Delivery address'
          required
          fullWidth
          name='deliveryAdd'
          value={formData.deliveryAdd}
          onChange={handleInputChange}
          error={errors.deliveryAdd}
          helperText={errors.deliveryAdd}
        />
        <Stack direction='row' sx={{ mx: 'auto' }} spacing={1}>
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
          <Button variant='outlined' color='error' onClick={handleCancel}>Cancel</Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
