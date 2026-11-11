import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@react-native-vector-icons/entypo';

import InventoryNavigation from './InventoryNavigation';
import LoggedInHome from '../components/LoggedInHome';
import ProfileScreen from '../screens/profile/ProfileScreen';

let Tab = createBottomTabNavigator();

export function MainTabs() {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#258458',
                tabBarInactiveTintColor: '#8290A5',
            }}
        >
            <Tab.Screen
                name="Home"
                component={LoggedInHome}
                options={{
                    tabBarLabel: 'Начало',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Inventory"
                component={InventoryNavigation}
                options={{
                    tabBarLabel: 'Инвентар',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="archive" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" color={color} size={size} />
                    ),
                }}
            />

        </Tab.Navigator>

    )
};