import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import MainApp from './MainApp'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainApp />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App;
