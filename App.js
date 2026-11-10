import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import AppHeaderComponent from './components/AppHeader';
import RootNavigation from './navigation/RootNavigation';


export default function App() {

  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppHeaderComponent />
          < RootNavigation isAuthenticated={isAuthenticated}/>
        </NavigationContainer >
      </SafeAreaProvider>
  );
}
