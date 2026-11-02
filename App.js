import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/home/home.jsx';

export default function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}
