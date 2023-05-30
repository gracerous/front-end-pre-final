import { SET_PRODUCTS, SET_SELECTED_PRODUCT, GET_ALL_PRODUCTS } from '../actions/productsActions';

const initialState = {
  data: [],
  selectedProduct: null,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        data: [
          ...action.payload
        ]
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};
