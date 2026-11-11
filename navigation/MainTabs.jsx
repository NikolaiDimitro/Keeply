import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import InventoryNavigation from './InventoryNavigation';
import LoggedInHome from '../components/LoggedInHome';
import ProfileScreen from '../screens/profile/ProfileScreen';

let Tab = createBottomTabNavigator();

export function MainTabs() {

    return (

        <Tab.Navigator screenOptions={{ headerShown: false }}>

            <Tab.Screen name="Home" component={LoggedInHome} />
            <Tab.Screen name="Inventory" component={InventoryNavigation} />
            <Tab.Screen name="Profil" component={ProfileScreen} />

        </Tab.Navigator>

    )
};