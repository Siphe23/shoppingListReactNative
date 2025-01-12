import { createStore } from 'redux';
import shoppingListReducer from '../reducers/shoppingListReducer';

const store = createStore(shoppingListReducer);

export default store;
