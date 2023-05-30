export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const EDIT_PRODUCT_CART = 'EDIT_PRODUCT_CART';
export const EMPTY_PRODUCT_CART = 'EMPTY_PRODUCT_CART'
export const ADD_PRODUCT_QUANTITY = 'ADD_PRODUCT_QUANTITY';
export const REMOVE_PRODUCT_QUANTITY = 'REMOVE_PRODUCT_QUANTITY'

export const addToCart = product => ({ type: ADD_PRODUCT_TO_CART, payload: product });
export const editCart = products => ({ type: EDIT_PRODUCT_CART, payload: products });
export const emptyCart = () => ({ type: EMPTY_PRODUCT_CART })
export const addProductQuantity = (productId) => ({ type: ADD_PRODUCT_QUANTITY, payload: productId });
export const removeProductQuantity = (productId) => ({ type: REMOVE_PRODUCT_QUANTITY, payload: productId });
