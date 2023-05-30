import { SET_BRANDS_TO_SHOW } from '../actions/filtersActions';

const initialState = {
  brands: [],
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRANDS_TO_SHOW:
      return {
        ...state,
        brands: action.payload,
      };
    default:
      return state;
  }
}

