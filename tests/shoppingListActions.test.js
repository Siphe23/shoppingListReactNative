import shoppingListReducer from '../reducers/shoppingListReducer';
import { addItem } from '../actions/shoppingListActions';

describe('shoppingListReducer', () => {
  test('should handle ADD_ITEM action', () => {
    const initialState = { items: [] };
    const action = addItem({ id: 1, name: 'Milk' });
    const newState = shoppingListReducer(initialState, action);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].name).toBe('Milk');
  });
});
