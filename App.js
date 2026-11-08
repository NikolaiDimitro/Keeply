import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';
import StackNav from './navigation/StackNavigator';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer >
    </SafeAreaProvider>
  );
}
