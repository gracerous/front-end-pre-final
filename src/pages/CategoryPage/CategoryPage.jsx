import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import ProductsCheckbox from '../../components/ProductsCheckbox/ProductsCheckbox';
import { setProducts } from '../../redux/actions/productsActions';
import PriceSlider from '../../components/PriceSlider/PriceSlider';
import CardSkeleton from '../../components/CardSkeleton/CardSkeleton';

export default function CategoryPage() {
  const API_URL = 'https://dummyjson.com';
  const category = useSelector((state) => state.categories.category);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const dispatch = useDispatch();

  const selectedBrands = useSelector((state) => state.selectedBrands.brands);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBrands([]);
    setIsLoading(true);
    if (category) {
      axios
        .get(`${API_URL}/products/category/${category}`)
        .then((response) => {
          const products = response.data.products;
          setCategoryProducts(products);
          const uniqueBrands = getUniqueBrands(products);
          setBrands(uniqueBrands);
          if (products.length > 0) {
            const lowestPrice = Math.min(...products.map((product) => product.price));
            const highestPrice = Math.max(...products.map((product) => product.price));
            setMinPrice(lowestPrice);
            setMaxPrice(highestPrice);
          }
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [category]);

  useEffect(() => {
    if (categoryProducts.length > 0 && selectedBrands.length >= 0) {
      showProducts(minPrice, maxPrice);
    }
  }, [categoryProducts, selectedBrands, minPrice, maxPrice]);

  useEffect(() => {
    dispatch(setProducts(categoryProducts));
  });

  const getUniqueBrands = (products) => {
    const uniqueBrands = [];
    products.forEach((product) => {
      if (!uniqueBrands.includes(product.brand)) {
        uniqueBrands.push(product.brand);
      }
    });
    return uniqueBrands;
  };

  const showProducts = (min, max) => {
    const filteredProducts = categoryProducts.filter((product) => {
      return (
        product.price >= min &&
        product.price <= max &&
        selectedBrands.includes(product.brand)
      );
    });
    setProductsToShow(filteredProducts);
  };

  return (
    <Grid container spacing={2} style={{ height: '100%' }}>
      {brands.length > 0 ? (
        <Grid item xs={2}>
          <ProductsCheckbox brands={brands} />
          <PriceSlider
            min={minPrice}
            max={maxPrice}
            onChange={(newValue) => showProducts(newValue[0], newValue[1])}
          />
        </Grid>
      ) : <Grid item xs={2} />}
      <Grid container item xs={10} spacing={2}>
        {isLoading ? (
          <>
            <Grid item xs={4}>
              <CardSkeleton />
            </Grid>
            <Grid item xs={4}>
              <CardSkeleton />
            </Grid>
            <Grid item xs={4}>
              <CardSkeleton />
            </Grid>
          </>
        ) : (
          productsToShow.map((product) => (
            <Grid item xs={4} key={product.title}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
}
