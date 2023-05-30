import { createStore, combineReducers, applyMiddleware } from 'redux';
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import filtersReducer from './reducers/filtersReducer';
import cartReducer from './reducers/cartReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import commentsReducer from './reducers/commentsReducer';
import ordersReducer from './reducers/ordersReducer';

const reducers = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  selectedBrands: filtersReducer,
  cart: cartReducer,
  comments: commentsReducer,
  orders: ordersReducer
});


const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk))
);

export default store;
