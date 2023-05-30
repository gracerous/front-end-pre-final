import React from 'react';
import Slider from 'react-slick';
import { Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductSlider() {
  const product = useSelector((state) => state.products.selectedProduct);
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageStyles = {
    height: '350px',
    objectFit: 'contain',
    width: '100%',
  };
  return (
    <Box style={{ width: 600, height: 300, marginLeft: 'auto', marginRight: 'auto', marginBottom: 5 }}>
      <Paper elevation={3} >
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <Box key={index}>
              <img src={image} alt='product' style={imageStyles} />
            </Box>
          ))}
        </Slider>
      </Paper>
    </Box>
  )
}