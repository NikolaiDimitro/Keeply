import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppHeader from './components/AppHeader.jsx';
import Footer from './components/Footer.jsx';
import Create from './screens/create/create.jsx';
import Home from './screens/home/home.jsx';
import Inventory from './screens/inventory/inventory.jsx';
import ItemDetails from './screens/items/itemDetails.jsx';
import ItemEdit from './screens/items/itemEdit.jsx';
import Profile from './screens/profile/profile.jsx';
import { appStyles as styles } from './styles/components';

const isAuthorizedUser = true; // Replace with your actual authentication logic

const items = [
  {
    id: 'sample-headphones',
    name: 'Безжични слушалки',
    category: 'Електроника',
    location: 'Спалня',
    mark: 'С',
    color: '#E9FAF0',
    price: '249,90 лв.',
    purchaseDate: '12.03.2025',
    warranty: '24 месеца',
    warrantyEndDate: '12.03.2027',
    store: 'Технополис',
    notes: 'Използват се основно за работа и пътуване.',
    documents: ['Касова бележка.pdf', 'Гаранционна карта.pdf'],
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
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppHeader isLoggedIn={isAuthorizedUser} />
        <View style={styles.content}>
          {activeTab === 'profile' ? (
            <Profile
              user={{ displayName: 'Иван Иванов', email: 'ivan@example.com' }}
            />
          ) : activeTab === 'inventory' ? (
            <Inventory
              items={items}
              onAddItem={() => setActiveTab('add')}
              onSelectItem={(item) => {
                setSelectedItem(item);
                setActiveTab('details');
              }}
            />
          ) : activeTab === 'details' ? (
            <ItemDetails
              item={selectedItem}
              onEdit={() => setActiveTab('edit')}
            />
          ) : activeTab === 'edit' ? (
            <ItemEdit item={selectedItem} />
          ) : activeTab === 'add' ? (
            <Create />
          ) : (
            <Home
              items={items}
              isLoggedIn={isAuthorizedUser}
              onAddItem={() => setActiveTab('add')}
              onShowAll={() => setActiveTab('inventory')}
            />
          )}
        </View>
        <Footer
          activeTab={
            activeTab === 'details' || activeTab === 'edit'
              ? 'inventory'
              : activeTab
          }
          onTabChange={setActiveTab}
        />
      </View>
    </SafeAreaProvider>
  );
}
