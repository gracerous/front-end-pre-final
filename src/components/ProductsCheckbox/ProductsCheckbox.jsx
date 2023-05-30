import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../redux/actions/filtersActions'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

export default function ProductsCheckbox({ brands }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(brands.reduce((accumulator, brand) => {
    accumulator[brand] = true;
    return accumulator;
  }, {}));

  const newChecked = { ...checked };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    brands.forEach((brand) => {
      newChecked[brand] = isChecked;
    });
    setChecked(newChecked);
    showSelectedBrands();
  };

  const showSelectedBrands = () => {
    const selectedBrands = Object.keys(newChecked).filter((key) => newChecked[key]);
    dispatch(setFilters(selectedBrands));
  }

  const handleChangeChild = (brand) => {
    newChecked[brand] = !newChecked[brand];
    setChecked(newChecked);
    showSelectedBrands();
  };

  useEffect(() => {
    showSelectedBrands();
  }, [])

  const isAllChecked = Object.values(checked).every((value) => value);
  const isIndeterminate = Object.values(checked).some((value) => value) && !isAllChecked;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant='h6'>Selected brands</Typography>
      <FormControlLabel
        label='Select all'
        control={
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {brands.map((brand, index) => (
          <FormControlLabel
            key={index}
            label={brand}
            control={
              <Checkbox
                checked={checked[brand]}
                onChange={() => handleChangeChild(brand)}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
}
