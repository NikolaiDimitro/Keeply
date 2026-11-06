import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Registration from './screens/auth/registration.jsx';
import { appStyles as styles } from './styles/components';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Registration />
      </View>
    </SafeAreaProvider>
  );
}
