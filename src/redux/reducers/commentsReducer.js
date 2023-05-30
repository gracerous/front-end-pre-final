import { SET_COMMENTS } from '../actions/commentsActions';

const initialState = {
  comments: []
};


export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    default:
      return state;
  }
}
