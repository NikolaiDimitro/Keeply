import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppHeader from './components/AppHeader.jsx';
import Footer from './components/Footer.jsx';
import Create from './screens/create/create.jsx';
import Home from './screens/home/home.jsx';
import Registration from './screens/auth/registration.jsx';
import Inventory from './screens/inventory/inventory.jsx';

const items = [
  {
    id: 'sample-headphones',
    name: 'Безжични слушалки',
    category: 'Електроника',
    location: 'Спалня',
    mark: 'С',
    color: '#E9FAF0',
  },
  {
    id: 'sample-laptop',
    name: 'Лаптоп Lenovo',
    category: 'Електроника',
    location: 'Домашен офис',
    mark: 'Л',
    color: '#E9FAF0',
  },
  {
    id: 'sample-coffee-machine',
    name: 'Кафемашина DeLonghi',
    category: 'Кухня',
    location: 'Кухненски плот',
    mark: 'К',
    color: '#FFF4D6',
  },
  {
    id: 'sample-bicycle',
    name: 'Градски велосипед',
    category: 'Спорт',
    location: 'Гараж',
    mark: 'В',
    color: '#E8F1FF',
  },
  {
    id: 'sample-camera',
    name: 'Фотоапарат Canon',
    category: 'Електроника',
    location: 'Шкаф в хола',
    mark: 'Ф',
    color: '#E9FAF0',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppHeader />
        <View style={styles.content}>
          {activeTab === 'inventory' ? (
            <Inventory items={items} onAddItem={() => setActiveTab('add')} />
          ) : activeTab === 'add' ? (
            <Create />
          ) : (
            <Home
              items={items}
              onAddItem={() => setActiveTab('add')}
              onShowAll={() => setActiveTab('inventory')}
            />
          )}
        </View>
        <Footer activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
