import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegistrationSrcreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CreateScreen from '../screens/create/CreateScreen';
import EditScreen from '../screens/items/EditScreen';
import DetailsScreen from '../screens/items/DetailsScreen';


let Stack = createStackNavigator();

export default function StackNav() {

    const [isAuthenticated, setAuthenticated] = useState(false);

    return (

        <Stack.Navigator>



            {isAuthenticated ?
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen} 
                        initialParams={{ isAuthenticated }}/>
                    <Stack.Screen
                        name="Profil"
                        component={ProfileScreen} />
                    <Stack.Screen
                        name="Create"
                        component={CreateScreen} />
                    <Stack.Screen
                        name="Edit"
                        component={EditScreen} />
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen} />
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
