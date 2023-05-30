import { ADD_PRODUCT_TO_CART, EDIT_PRODUCT_CART, EMPTY_PRODUCT_CART, ADD_PRODUCT_QUANTITY, REMOVE_PRODUCT_QUANTITY } from "../actions/cartActions";

const initialState = {
  products: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const productToAdd = action.payload;
      const existingProduct = state.products.find((item) => item.id === productToAdd.id);
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === productToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          products: [...state.products, productToAdd]
        };
      }
    case EDIT_PRODUCT_CART:
      if (action.payload) {
        return {
          ...state,
          products: action.payload
        }
      } else {
        return {
          products: []
        }
      }
    case EMPTY_PRODUCT_CART:
      return {
        ...state,
        products: []
      };
      case ADD_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
        ),
      };
    case REMOVE_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload ? { ...product, quantity: product.quantity - 1 } : product
        ),
      };
    default:
      return state;
  }
}