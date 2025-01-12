import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from '../actions/shoppingListActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  // Function to load items from AsyncStorage
  const loadItems = async () => {
    const savedItems = await AsyncStorage.getItem('shoppingList');
    if (savedItems) {
      dispatch({ type: 'LOAD_ITEMS', payload: JSON.parse(savedItems) });
    }
  };

  // Function to save items to AsyncStorage
  const saveItems = async () => {
    await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
  };

  // Effect to load items when the component is mounted
  useEffect(() => {
    loadItems();
  }, []);

  // Effect to save items whenever they change
  useEffect(() => {
    saveItems();
  }, [items]);

  const handleAddItem = () => {
    if (newItem) {
      dispatch(addItem({ id: Date.now(), name: newItem }));
      setNewItem('');
    }
  };

  const handleEditItem = (id, updatedName) => {
    dispatch(editItem(id, { name: updatedName }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Add a new item"
        value={newItem}
        onChangeText={setNewItem}
        style={{ marginBottom: 10, padding: 5, borderWidth: 1 }}
      />
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Button title="Edit" onPress={() => handleEditItem(item.id, 'Updated Name')} />
            <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingList;
