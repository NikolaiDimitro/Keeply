import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AppHeaderComponent from './components/AppHeader';
import RootNavigation from './navigation/RootNavigation';
import Providers from './providers/authProveders'


export default function App() {

  return (
    <SafeAreaProvider>
      <Providers.AuthenticatedProvider>
        <NavigationContainer>
          <AppHeaderComponent />
          < RootNavigation  />
        </NavigationContainer >
      </ Providers.AuthenticatedProvider>
    </SafeAreaProvider>
  );
}
