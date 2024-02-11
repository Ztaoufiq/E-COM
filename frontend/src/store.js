// store.js
import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers,  applyMiddleware } from 'redux';

import { productsReducer, productDetailsReducer } from './reducers/productReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';

let initialState = {};
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer
});

const middleWare = [thunk];

// Create Redux store using configureStore
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));
// Export actions for easier use in components
//export const { increment, decrement } = actions;

export default store;
