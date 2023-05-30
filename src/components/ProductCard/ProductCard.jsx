import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Grow
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import './ProductCard.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleProductSelect = id => {
    navigate(`/products/${id}`);
  }
  return (
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 0' }}
      {...(product ? { timeout: 1000 } : {})}
    >
      <Paper elevation={3}>
        <Card sx={{ height: 480 }}>
          <CardActionArea onClick={() => handleProductSelect(product.id)} sx={{ height: 330, overflow: 'hidden' }}>
            <CardMedia
              component='img'
              height='200'
              alt='product image'
              image={product.thumbnail}
              sx={{ objectFit: "cover" }}
            />
            <CardContent >
              <Typography gutterBottom variant='h6' component='div'>
                {product.title}
              </Typography>
              <Typography className='productCardDescription' variant='body2' color='text.secondary'>
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardContent>
            <Rating name='read-only' value={product.rating} readOnly />
            {product.discountPercentage ?
              (<Box>
                <Typography component='span' sx={{ textDecoration: 'line-through', marginRight: '0.5em' }}>
                  {product.price}
                </Typography>
                <Typography component='span'>
                  {(product.price / 100 * (100 - product.discountPercentage)).toFixed(2)} USD
                </Typography>
              </Box>) :
              (<Typography>{product.price}</Typography>)}
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => handleProductSelect(product.id)}>See More</Button>
          </CardActions>
        </Card>
      </Paper>
    </Grow>
  )
}