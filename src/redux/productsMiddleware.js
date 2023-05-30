import axios from 'axios';
import { getAllProducts } from './actions/productsActions';
import { setCategories } from './actions/categoriesActions';
import { setComments } from './actions/commentsActions';

const API_URL = 'https://dummyjson.com';

export const getProducts = () => {
  return dispatch => axios.get(`${API_URL}/products?limit=0`)
    .then(result => dispatch(getAllProducts(result.data.products)));
}

export const getCategories = () => {
  return dispatch => axios.get(`${API_URL}/products/categories`)
    .then(result => dispatch(setCategories(result.data)));
}

export const getComments = () => {
  return dispatch => axios.get(`${API_URL}/comments`)
    .then(result => dispatch(setComments(result.data.comments)));
}