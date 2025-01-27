import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.header}>Hello, Montserrat!</Text>
        <Icon name="rocket-launch" size={100} color="blue" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 48,
    fontFamily: 'Montserrat',
    color: '#333',
    marginBottom: 20,
  },
});

export default App;
