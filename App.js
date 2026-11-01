import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from './config/firebase.js';
import AppHeader from './components/AppHeader.jsx';

export default function App() {
  const projectId = auth.app.options.projectId;

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Keeply</Text>
        <Text>Firebase е инициализиран!</Text>
        <Text>Project ID: {projectId}</Text>
        <Text>Authentication: {auth ? 'OK' : 'Error'}</Text>
        <Text>Firestore: {db ? 'OK' : 'Error'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
