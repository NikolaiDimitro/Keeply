import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './navigation/StackNavigator';
import AppHeaderComponent from './components/AppHeader';
import FooterComponent from './components/Footer';
import NativeBottomNavigation from './navigation/NativeBottomTabsNavigator';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppHeaderComponent/>
          <NativeBottomNavigation />
          <FooterComponent/>
        </NavigationContainer >
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
