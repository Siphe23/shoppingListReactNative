import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store/store';
import ShoppingList from './components/ShoppingList';
import WelcomeScreen from './components/WelcomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ShoppingList" component={ShoppingList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}