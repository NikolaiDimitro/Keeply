import { createStackNavigator } from "@react-navigation/stack";

import InventoryNavigation from "./InventoryNavigation";
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegistrationSrcreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

let Stack = createStackNavigator();

export default function HomeNavigation({ isAuthenticated }) {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            {isAuthenticated ?
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        initialParams={{ isAuthenticated }} />
                    <Stack.Screen
                        name="Profil"
                        component={ProfileScreen} />
                    < Stack.Screen
                        name="Inventory"
                        component={InventoryNavigation} />

                </>
                :
                <>

                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        initialParams={{ isAuthenticated }} />
                    <Stack.Screen
                        name="Registred"
                        component={RegisterScreen} />

                </>
            }

        </Stack.Navigator>

    )
};