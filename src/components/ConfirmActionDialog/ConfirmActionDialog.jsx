import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmActionDialog({ openDialog, handleCloseDialog, deleteProduct }) {
  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Please confirm action'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to delete product from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleCloseDialog}>Cancel</Button>
          <Button variant='contained' onClick={deleteProduct}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}