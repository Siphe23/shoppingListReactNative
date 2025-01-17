import React from 'react'; 
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/image.png')}  
        style={styles.image}
      />
      <Text style={styles.text}>Welcome to the Shopping List App!</Text>
      <Button 
        title="Go to Shopping List" 
        onPress={() => navigation.navigate('ShoppingList')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B4A7B4', 
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, 
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333', 
  },
});

export default WelcomeScreen;
