export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export const setProducts = data => ({ type: SET_PRODUCTS, payload: data });
export const setSelecetedProduct = product => ({ type: SET_SELECTED_PRODUCT, payload: product });
export const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, payload: products });

