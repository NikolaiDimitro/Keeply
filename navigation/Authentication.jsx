import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationSrcreen";

let Stack = createStackNavigator();

export function AuthenticationNavigation() {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />

        </Stack.Navigator>

    )
};