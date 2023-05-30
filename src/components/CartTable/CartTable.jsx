import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editCart } from '../../redux/actions/cartActions';
import ConfirmActionDialog from '../ConfirmActionDialog/ConfirmActionDialog';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { removeProductQuantity, addProductQuantity } from '../../redux/actions/cartActions';


export default function CartTable() {
  const [productToDelete, setProductToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const TAX_RATE = 0.2;

  const productsInCart = useSelector((state) => state.cart.products);

  function subtotal(items) {
    return items.map(({ price, quantity }) => price * quantity).reduce((sum, i) => sum + i, 0);
  }

  const handleDeleteBtn = (product) => {
    setOpenDialog(true);
    setProductToDelete(product)
  }

  const deleteProduct = () => {
    const updatedProducts = [];
    productsInCart.forEach(item => {
      if (item.id !== productToDelete.id) {
        updatedProducts.push(item)
      }
    });
    dispatch(editCart(updatedProducts));
    setOpenDialog(false);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const invoiceSubtotal = subtotal(productsInCart);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleAddQuantity = (product) => {
    dispatch(addProductQuantity(product.id));
  };
  
  const handleRemoveQuantity = (product) => {
    if (product.quantity === 1) {
      setProductToDelete(product);
      setOpenDialog(true);
    } else {
      dispatch(removeProductQuantity(product.id));
    }
  };

  return (
    <TableContainer component={Paper}>
      <ConfirmActionDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} deleteProduct={deleteProduct} />
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={3}>
              Details
            </TableCell>
            <TableCell align='right'>Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='right'>Unit</TableCell>
            <TableCell align='right'>Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsInCart.map((productInCart) => (
            <TableRow key={productInCart.title}>
              <TableCell>{productInCart.title}</TableCell>
              <TableCell align='right'>
                <Tooltip title='Remove'>
                  <IconButton onClick={()=> handleRemoveQuantity(productInCart)}>
                    <RemoveIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
                {productInCart.quantity}
                <Tooltip title='Add'>
                  <IconButton onClick={()=> handleAddQuantity(productInCart)}>
                    <AddIcon fontSize='small'/>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align='right'>{productInCart.price}</TableCell>
              <TableCell align='right'>{ccyFormat(productInCart.price * productInCart.quantity)}</TableCell>
              <TableCell sx={{ width: 25 }} align='left'>
                <Tooltip title='Delete'>
                  <IconButton onClick={() => handleDeleteBtn(productInCart)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}