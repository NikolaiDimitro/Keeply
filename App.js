import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from './config/firebase.js';
import Footer from './components/Footer.jsx';
import AppHeader from './components/AppHeader.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/auth/login.jsx';

export default function App() {
  const projectId = auth.app.options.projectId;

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppHeader />
        <View style={styles.content}>
          <Text style={styles.title}>Keeply</Text>
          <Text>Firebase е инициализиран!</Text>
          <Text>Project ID: {projectId}</Text>
          <Text>Authentication: {auth ? 'OK' : 'Error'}</Text>
          <Text>Firestore: {db ? 'OK' : 'Error'}</Text>
        </View>
        <Footer />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
