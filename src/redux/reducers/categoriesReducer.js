import { SET_CATEGORIES, SET_CATEGORY } from '../actions/categoriesActions';

const initialState = {
  data: [],
  category: null
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        data: [
          ...action.payload
        ]
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    default:
      return state;
  }
};
