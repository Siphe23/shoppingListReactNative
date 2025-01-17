import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from '../actions/shoppingListActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; 

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

 
  const loadItems = async () => {
    const savedItems = await AsyncStorage.getItem('shoppingList');
    if (savedItems) {
      dispatch({ type: 'LOAD_ITEMS', payload: JSON.parse(savedItems) });
    }
  };


  const saveItems = async () => {
    await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
  };

  useEffect(() => {
    loadItems();
  }, []);

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
    setEditingItem(null); 
    setUpdatedName('');
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleStartEditing = (item) => {
    setEditingItem(item.id);
    setUpdatedName(item.name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new item"
        value={newItem}
        onChangeText={setNewItem}
        style={styles.input}
      />
      <Button title="Add Item" onPress={handleAddItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <MaterialIcons name="shopping-cart" size={24} color="black" style={styles.icon} />
            <Text style={styles.text}>{item.name}</Text>

            {/* Editing Form */}
            {editingItem === item.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  value={updatedName}
                  onChangeText={setUpdatedName}
                  style={styles.input}
                />
                <Button title="Save" onPress={() => handleEditItem(item.id, updatedName)} />
              </View>
            ) : (
              <View style={styles.buttons}>
                <Button title="Edit" onPress={() => handleStartEditing(item)} />
                <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default ShoppingList;
