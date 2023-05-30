import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductSlider from '../../components/Slider/Slider';
import { addToCart } from '../../redux/actions/cartActions';
import { useEffect, useState } from 'react';
import { setSelecetedProduct } from '../../redux/actions/productsActions';
import { Box, CardMedia, Paper, Typography, Button, Card, CardActions, CardContent } from '@mui/material';
import AlertDialogSlide from '../../components/AlertDialogSlide/AlertDialogSlide';
import { getComments } from '../../redux/productsMiddleware';
import UserCommentField from '../../components/UserCommentField/UserCommentField';
import CommentsSection from '../../components/CommentsSection/CommentsSection';


export default function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const product = useSelector((state) => state.products.selectedProduct);
  const comments = useSelector((state) => state.comments.comments)
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();

  useEffect(() => {
    for (let product of products) {
      if (product.id === parseInt(id)) {
        dispatch(setSelecetedProduct(product));
      }
    }
    dispatch(getComments());
  }, [])

  const addProductToCart = () => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(productToAdd));
    setOpen(true);
  };

  return (
    product && <Box>
      <AlertDialogSlide open={open} handleClose={handleClose} />
      <Card component={Paper} elevation={1} sx={{ padding: '2em', marginBottom: 5 }}>
        <Typography
          variant='h3'
          component='h1'
          color='primary'
          sx={{ marginBottom: 5 }}
        >
          {product.title}
        </Typography>
        <CardMedia sx={{ marginBottom: 15 }}>
          <ProductSlider product={product} />
        </CardMedia>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography sx={{ maxWidth: '40%', padding: '1em' }}>
            {product.description}
          </Typography>
          <Box sx={{ width: '40%', padding: '1em', display: 'flex', justifyContent: 'space-around' }} component={Paper} variant="outlined">
            {product.discountPercentage ? (
              <Box sx={{ padding: '1em' }}>
                <Typography component='span' variant='h5' sx={{ textDecoration: 'line-through', marginRight: '0.5em' }}>
                  {product.price}
                </Typography>
                <Typography component='span' variant='h5' color='primary'>
                  {(product.price / 100 * (100 - product.discountPercentage)).toFixed(2)} USD
                </Typography>
              </Box>) :
              (<Typography>{product.price}</Typography>)
            }
            <CardActions>
              <Button variant='contained' onClick={addProductToCart}>Add to Cart</Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ marginBottom: 5 }}>
        <UserCommentField />
      </Box>
      <Box component={Paper} elevation={1} sx={{ padding: '1.5em' }}>
        <CommentsSection comments={comments} />
      </Box>
    </Box>
  )
}
