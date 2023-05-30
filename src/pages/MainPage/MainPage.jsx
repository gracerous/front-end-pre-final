import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/productsMiddleware';
import ProductCard from '../../components/ProductCard/ProductCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Grid, Button, Typography } from '@mui/material';

import CardSkeleton from '../../components/CardSkeleton/CardSkeleton';

export default function MainPage() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.data);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(product => product.rating > 4.9);
    setTopRatedProducts(filteredProducts);
  }, [products]);

  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + 3);
  };

  return (
    <Box>
      <Typography color='primary' variant='h2' sx={{mb:5}}>See out top-rated products!</Typography>
      {topRatedProducts.length > 0 ? (
        <Grid container item xs={12} spacing={3} sx={{ marginBottom: '20px' }}>
          {topRatedProducts.slice(0, visibleProducts).map(product => (
            <Grid item xs={4} key={product.title}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container item xs={12} spacing={3} sx={{ marginBottom: '20px' }}>
          <Grid item xs={4}>
            <CardSkeleton />
          </Grid>
          <Grid item xs={4}>
            <CardSkeleton />
          </Grid>
          <Grid item xs={4}>
            <CardSkeleton />
          </Grid>
        </Grid>
      )}
      <Button
        sx={{ width: '100%', height: '50px' }}
        endIcon={<RefreshIcon />}
        disabled={visibleProducts >= topRatedProducts.length}
        onClick={handleShowMore}
      >
        Show More
      </Button>
    </Box>
  );
}