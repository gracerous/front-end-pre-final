import * as React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const steps = [
  'Delivery information',
  'Payment',
  'Order overview',
];

export default function PaymentStepper({ activeStep }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}