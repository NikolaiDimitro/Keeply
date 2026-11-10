import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import AppHeaderComponent from './components/AppHeader';
import HomeNavigation from './navigation/HomeNavigation';


export default function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppHeaderComponent />
          < HomeNavigation isAuthenticated={isAuthenticated}/>
        </NavigationContainer >
      </SafeAreaProvider>
  );
}
