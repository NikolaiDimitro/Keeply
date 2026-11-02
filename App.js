import { Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import Footer from './components/Footer.jsx';
import AppHeader from './components/AppHeader.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/home/home.jsx';
import Registration from './screens/auth/registration.jsx';
import Login from './screens/auth/login.jsx';

const screenHeight = Dimensions.get('window').height;

export default function App() {
  return (
    <SafeAreaProvider>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.screens}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.testScreen, { height: screenHeight * 0.7 }]}>
          <Home />
        </View>

        <View style={[styles.testScreen, { height: screenHeight * 0.7 }]}>
          <Login />
        </View>

        <View style={[styles.testScreen, { height: screenHeight * 0.7 }]}>
          <Registration />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  screens: {
    flexGrow: 1,
  },
  testScreen: {
    width: '100%',
  },
});
