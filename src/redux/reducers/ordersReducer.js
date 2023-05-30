import { SET_ORDER_DETAILS } from '../actions/ordersActions';

const initialState = {
  orders: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
}
