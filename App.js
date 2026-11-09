import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
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
